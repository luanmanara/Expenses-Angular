import { HttpParams } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { PeriodService } from 'src/app/services/period.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit {

  value?: number;
  transactionType?: number;
  description?: string;
  dateOfMovement?: Date;
  period: any;
  periodId: number = 0;

  params: HttpParams = new HttpParams();

  // error validations
  errorMsg: boolean = false;
  successMsg: boolean = false;
  errorMessages: Array<string> = [];

  constructor(private transactionService: TransactionService,
              private periodService     : PeriodService) { }

  async ngOnInit(): Promise<void> {
    this.period = this.periodService.currentPeriodBS;
  }

  async createTransaction(form: NgForm){

    const createTransactionResponse = await lastValueFrom(this.transactionService.createTransaction(form.value));

    if(createTransactionResponse.isSuccess){

      // parameters to search for the period transactions and update BS
      let transactionParams: HttpParams = new HttpParams();
      transactionParams = transactionParams.set('periodId', this.periodId);

      // Update Transaction BS
      const getTransactionsResponse = await lastValueFrom(this.transactionService.getTransactions(transactionParams));
      this.transactionService.transactionsBS.next(getTransactionsResponse.result);

      // Update Period BS
      const getPeriodResponse = await lastValueFrom(this.periodService.getPeriod(this.period?.value.id));
      this.periodService.currentPeriodBS.next(getPeriodResponse.result);

      // handle the success messages
      this.successMsg = true;
      setTimeout(() =>{ this.successMsg = false; }, 1000);

    }else {
      this.errorMsg = true;
      this.errorMessages.push(createTransactionResponse.errorMessages[0]);          
      setTimeout(() => { this.errorMsg = false; this.errorMessages.pop(); }, 1000);
    }
  }
}
