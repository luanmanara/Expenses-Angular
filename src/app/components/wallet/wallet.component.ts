import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { WalletService } from 'src/app/services/wallet.service';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  // modal
  @ViewChild('modal') modal?: GenericModalComponent;
  modalRef: BsModalRef = new BsModalRef();

  wallets: any;
  userId: string = '';
  httpParams: HttpParams = new HttpParams();

  constructor(private walletService: WalletService,
              private userService: UserService,
              private router: Router,
              private modalService: BsModalService) {
  }

  async ngOnInit(): Promise<void> {

    this.walletService.currentWalletBS.next(null);


    // Check if current user is available
    if (this.userService.currentUserBS.value){
      this.userId = this.userService.currentUserBS.value?.user.id;
    }

    this.httpParams = this.httpParams.set('userId', this.userId);

    const getWalletsResponse = await lastValueFrom(this.walletService.getWallets(this.httpParams));

    if (getWalletsResponse.isSuccess) {
      this.walletService.walletsBS.next(getWalletsResponse.result);
      this.wallets = this.walletService.walletsBS;
    }

  }

  async selectWallet(id: number) {
    const getWalletresponse = await lastValueFrom(this.walletService.getWallet(id));

    if (getWalletresponse.isSuccess) {
      this.walletService.currentWalletBS.next(getWalletresponse.result);
      this.router.navigate(['/periods']);
    }

  }

  async openModal(){

    if(this.modal && this.modal.template) {
      this.modalRef = this.modalService.show(this.modal.template);
      this.modal.hideModal = this.modalRef.hide;
    }

  }

}
