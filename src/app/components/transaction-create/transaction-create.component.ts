import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  periodId?: number;
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
    this.params = this.params.set('isClosed', false);
    this.periodService.getPeriods(this.params).subscribe({
      next: (res) => {
        if(res.isSuccess) {
          this.periods = res.result;
        }
      },
      complete: () => {
        this.route.queryParams.subscribe(param => {
          this.periodId = param['periodId'];
        });
      }
    });
  }

  createTransaction(form: NgForm){
    this.transactionService.createTransaction(form.value).subscribe({
      next: (response) => {
        if(response.isSuccess){
          this.successMsg = true;
        }else {
          this.errorMsg = true;
          this.errorMessages.push(response.errorMessages[0]);
        }
      }
    });
  }

}
