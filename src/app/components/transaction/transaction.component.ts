import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeriodService } from 'src/app/services/period.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  // error handling
  errorMsg: boolean = false;
  errorMessages: Array<string> = [];

  transactions: any;
  params: HttpParams = new HttpParams();
  periodId: number = 0;
  period?: any;

  constructor(private transactionService: TransactionService,
              private route             : ActivatedRoute,
              private periodService     : PeriodService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {

      if(Object.keys(param).length != 0 && Object.keys(param)[0] == 'periodId'){
        this.params = this.params.set('periodId', param['periodId']);
        this.periodId = param['periodId'];
        
        this.periodService.getPeriod(this.periodId).subscribe(res => {
          this.period = res.result;
        });

      }else{
        this.params = new HttpParams();
      }

      this.transactionService.getTransactions(this.params).subscribe({
        next: (response) => {
          if(response.isSuccess){
            this.transactions = response.result;
            for(let t of this.transactions){
              switch(t.transactionType){
                case 1:
                  t.transactionType = 'Crédito';
                  break;
                case 2:
                  t.transactionType = 'Débito';
                  break;
                case 3:
                  t.transactionType = 'Salário';
                  break;
              }
            }
          }
        }
      });
    });
  }

  deleteTransaction(id: number){
    let delConfirm: boolean = confirm('Are you sure you want to delete this transaction?');

    if(delConfirm){
      this.transactionService.deleteTransaction(id).subscribe({
        next: (response) => {
          if(response.isSuccess){
            this.ngOnInit();
          }else{
            this.errorMsg = true;
            this.errorMessages.push(response.errorMessages[0]);
          }
        }
      });
    }
  }
}