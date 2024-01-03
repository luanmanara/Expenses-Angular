import { HttpParams } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PeriodService } from 'src/app/services/period.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit {

  @Input() periodId: number = 0;

  value?: number;
  transactionType?: number;
  description?: string;
  dateOfMovement?: Date;
  periods: any;

  params: HttpParams = new HttpParams();

  // error validations
  errorMsg: boolean = false;
  successMsg: boolean = false;
  errorMessages: Array<string> = [];

  constructor(private transactionService: TransactionService,
              private periodService     : PeriodService,
              private route             : ActivatedRoute) { }

  ngOnInit(): void {
    if(!this.periodId) {
      this.params = this.params.set('isClosed', false);
      this.periodService.getPeriods(this.params).subscribe({
        next: (res) => {
          if(res.isSuccess) {
            this.periods = res.result;
          }
        }
      });
    }else {
      this.periodService.getPeriod(this.periodId).subscribe(res => {
        if(res.isSuccess) {
          this.periods = [res.result];
        }
      });
    }
  }

  createTransaction(form: NgForm){
    this.transactionService.createTransaction(form.value).subscribe({
      next: (response) => {
        if(response.isSuccess){

          // parameters to search for the period transactions and update BS
          let transactionParams: HttpParams = new HttpParams();
          transactionParams = transactionParams.set('periodId', this.periodId);
          this.transactionService.getTransactions(transactionParams).subscribe(response => {
            this.transactionService.transactionsBS.next(response.result);
          });

          this.periodService.getPeriod(this.periodId).subscribe(res => {
            this.periodService.periodsBS.next(res.result);
          });

          // handle the success messages
          this.successMsg = true;
          setTimeout(() =>{
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
