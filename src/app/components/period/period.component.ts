import { HttpParams } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild, resolveForwardRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodService } from 'src/app/services/period.service';
import { WalletService } from 'src/app/services/wallet.service';
import { PeriodUpdateDTO } from 'src/app/_models/dto/periodUpdateDTO';
import { lastValueFrom } from 'rxjs';
import { WalletDTO } from 'src/app/_models/dto/walletDTO';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css']
})
export class PeriodComponent implements OnInit {

  // modal
  @ViewChild('modal') modal?: GenericModalComponent;
  modalRef: BsModalRef = new BsModalRef();
  
  periods : any;
  params: HttpParams = new HttpParams();
  wallet: any;

  constructor(private periodService : PeriodService,
              private walletService : WalletService,
              private router        : Router,
              private modalService  : BsModalService) { }

  async ngOnInit(): Promise<void> {

      if(this.walletService.currentWalletBS.value != null){
        this.wallet = this.walletService.currentWalletBS.value;
      }else {
        this.router.navigate(['/wallets']);
        return;
      }

      this.params = this.params.set('walletId', this.wallet.id);

      const getPeriodsResponse = await lastValueFrom(this.periodService.getPeriods(this.params));

      if(getPeriodsResponse.isSuccess){
        this.periodService.periodsBS.next(getPeriodsResponse.result);
        this.periods = this.periodService.periodsBS;

        this.periods?.value.forEach((element: {wallet : WalletDTO}, key: number) => {
          element.wallet = this.wallet;
        });
      }
  }

  async closePeriod(id: number){

    const delConfirm: boolean = confirm('Are you sure you want to close this period?');

    if(delConfirm) {
      const model: PeriodUpdateDTO = {
        id: id,
        isClosed: true
      };

      const closePeriodResponse = await lastValueFrom(this.periodService.closePeriod(id, model));
    
      if(closePeriodResponse.isSuccess){
        this.ngOnInit();
      }
    }
  }

  async selectPeriod(id: number){
    const getPeriodResponse = await lastValueFrom(this.periodService.getPeriod(id));
    if(getPeriodResponse.isSuccess){
      this.periodService.currentPeriodBS.next(getPeriodResponse.result);
      this.router.navigate(['/transactions']);
    }
  }

  async openModal(){
    if(this.modal && this.modal.template) {
      this.modalRef = this.modalService.show(this.modal.template);
      this.modal.hideModal = this.modalRef.hide;
    }
  }

}
