import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { WalletCreateDTO } from 'src/app/_models/dto/walletCreateDTO';
import { UserService } from 'src/app/services/user.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-wallet-create',
  templateUrl: './wallet-create.component.html',
  styleUrls: ['./wallet-create.component.css']
})
export class WalletCreateComponent implements OnInit {

  name?: string;
  saved?: number;
  httpParams: HttpParams = new HttpParams();
  userId: string = '';
  
  // errors
  errorMsg: boolean = false;
  errorMessages: Array<string> = [];
  successMsg: boolean = false;

  constructor(private walletService: WalletService,
              private userService:   UserService) { }

  ngOnInit(): void {
    if (this.userService.currentUserBS.value) {
      this.userId = this.userService.currentUserBS.value?.user.id;
    } 

  }

  async createWallet(form: NgForm) {
    
    if (form.valid) {

      const walletCreateDTO: WalletCreateDTO = {
        name: form.value.name,
        saved: form.value.saved,
        userId: this.userId
      }

      const walletCreateResponse = await lastValueFrom(this.walletService.createWallet(walletCreateDTO));

      if (walletCreateResponse.isSuccess) {
        this.successMsg = true;
        setTimeout( () => { this.successMsg = false; }, 1000);

        this.httpParams = this.httpParams.set('userId', this.userId);

        const getWalletsResponse = await lastValueFrom(this.walletService.getWallets(this.httpParams));

        if(getWalletsResponse.isSuccess){
          this.walletService.walletsBS.next(getWalletsResponse.result);
        }

      } else {
        this.errorMsg = true;
        this.errorMessages = walletCreateResponse.errorMessages;
        setTimeout(()=>{ this.errorMsg = false; this.errorMessages.pop(); }, 1000);
      }

      form.reset();

    } else {
      console.log("Something went wrong!");
    }
  }
}
