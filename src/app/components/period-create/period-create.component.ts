import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { PeriodService } from 'src/app/services/period.service';
import { UserService } from 'src/app/services/user.service';
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
  httpParams: HttpParams = new HttpParams();

  // error handling
  errorMessages: Array<string> = [];
  errorMsg: boolean = false;
  successMsg: boolean = false;

  constructor(private periodService: PeriodService,
              private walletService: WalletService) { }

  ngOnInit(): void {
    this.wallets = this.walletService.walletsBS;
    this.walletId = this.walletService.currentWalletBS.value?.id??0;
  }

  async createPeriod(form: NgForm) {
    const createPeriodResponse = await lastValueFrom(this.periodService.createPeriod(form.value));
    if (createPeriodResponse.isSuccess) {

      this.httpParams = this.httpParams.set('walletId', this.walletId);

      const getPeriodsResponse = await lastValueFrom(this.periodService.getPeriods(this.httpParams));

      if(getPeriodsResponse.isSuccess){
        this.periodService.periodsBS.next(getPeriodsResponse.result);
      }
      
      this.successMsg = true;
      setTimeout(() => { this.successMsg = false; }, 1000);

    } else {
      this.errorMsg = true;
      this.errorMessages.push(createPeriodResponse.errorMessages[0]);
      setTimeout(() => { this.errorMsg = false; this.errorMessages.pop(); }, 1000);
    }
  }
}
