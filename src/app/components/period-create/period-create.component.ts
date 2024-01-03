import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PeriodService } from 'src/app/services/period.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-period-create',
  templateUrl: './period-create.component.html',
  styleUrls: ['./period-create.component.css']
})
export class PeriodCreateComponent implements OnInit {

  month?: Date;
  walletId: number = 0;
  wallets? :any;

  // error handling
  errorMessages: Array<string> = [];
  errorMsg: boolean = false;
  successMsg: boolean = false;

  constructor(private periodService: PeriodService,
              private walletService: WalletService,
              private route        : ActivatedRoute) { }

  ngOnInit(): void {
    this.walletService.getWallets().subscribe({
      next: (response) => {
        this.wallets = response.result;
      },
      complete: () => {
        this.route.queryParams.subscribe(param => {
          this.walletId = param['walletId'];
        });
      }
    });
  }

  createPeriod(form: NgForm){
    this.periodService.createPeriod(form.value).subscribe({
      next: (response) => {
        if(response.isSuccess){
          this.successMsg = true;
          setTimeout(()=>{
            this.successMsg = false;
          }, 1000);
        }else {
          this.errorMsg = true;
          this.errorMessages.push(response.errorMessages[0]);
          setTimeout(()=>{
            this.errorMsg = false;
            this.errorMessages.pop();
          }, 1000);
        }
      }
    });
  }

}
