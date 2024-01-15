import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { TransactionUpdateDTO } from 'src/app/_models/dto/transactionUpdateDTO';
import { PeriodService } from 'src/app/services/period.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.css']
})
export class TransactionEditComponent implements OnInit {

  @Input() transactionId: number = 0;

  id: number = 0;
  periodId: number = 0;
  value?: number;
  transactionType?: number;
  description?: string;
  dateOfMovement?: string;
  period: any = {id: 0, month: ''};
  transaction: any;

  // error validations
  errorMsg: boolean = false;
  successMsg: boolean = false;
  errorMessages: Array<string> = [];

  constructor(private transactionService: TransactionService,
              private datePipe          : DatePipe,
              private periodService     : PeriodService) { }


  ngOnInit(): void {

    if(this.transactionService.currentTransactionBS.value != null && this.periodService.currentPeriodBS.value != null){

      const currentTransactionBSValue = this.transactionService.currentTransactionBS.value;
      const currentPeriodBSValue      = this.periodService.currentPeriodBS.value;

      this.id = currentTransactionBSValue.id;
      this.periodId = currentTransactionBSValue.periodId;
      this.value = currentTransactionBSValue.value;
      this.transactionType = currentTransactionBSValue.transactionType;
      this.description = currentTransactionBSValue.description;
      let date = new Date(currentTransactionBSValue.dateOfMovement);

      // format date
      let dateString = this.datePipe.transform(date, "yyyy-MM-dd");
      this.dateOfMovement = dateString != null ? dateString : '';

      this.period = currentPeriodBSValue;
    }
  }

  async updateTransaction(form: NgForm){
    const model: TransactionUpdateDTO = form.value;
    const updateTransactionResponse = await lastValueFrom(this.transactionService.updateTransaction(model.id, model));

    if(updateTransactionResponse.isSuccess){
      
      // parameters to search for the period transactions and update BS
      let transactionParams: HttpParams = new HttpParams();
      transactionParams = transactionParams.set('periodId', this.period.id);

      // Update Transaction BS
      const getTransactionsResponse = await lastValueFrom(this.transactionService.getTransactions(transactionParams));
      this.transactionService.transactionsBS.next(getTransactionsResponse.result);

      // Update Period BS
      const getPeriodResponse = await lastValueFrom(this.periodService.getPeriod(this.period.id));
      this.periodService.currentPeriodBS.next(getPeriodResponse.result);

      this.successMsg = true;
      
      setTimeout(() =>{ this.successMsg = false; }, 1000);

    }else {
      this.errorMsg = true;
      this.errorMessages.push(updateTransactionResponse.errorMessages[0]);

      setTimeout(() => { this.errorMsg = false; this.errorMessages.pop(); }, 1000);
    }
  }
}
