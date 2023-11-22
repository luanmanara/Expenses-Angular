import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-wallet-create',
  templateUrl: './wallet-create.component.html',
  styleUrls: ['./wallet-create.component.css']
})
export class WalletCreateComponent implements OnInit {

  name?: string;
  saved?: number;
  
  errorMsg: boolean = false;
  errorMessages: Array<string> = [];
  successMsg: boolean = false;

  constructor(private walletService: WalletService) { }

  ngOnInit(): void {
  }

  createWallet(form: NgForm) {
    if (form.valid) {
      this.walletService.createWallet(form.value).subscribe(res => {
        if (res.isSuccess) {
          this.successMsg = true;
        } else {
          this.errorMsg = true;
          this.errorMessages = res.errorMessages;
        }
      });

      form.reset();
    } else {
      console.log("Something went wrong!");
    }
  }
}
