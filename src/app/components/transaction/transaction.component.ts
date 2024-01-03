import { HttpParams } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeriodService } from 'src/app/services/period.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  //Modal
  modalRef: BsModalRef = new BsModalRef();

  // error handling
  errorMsg: boolean = false;
  errorMessages: Array<string> = [];

  transactions: any;
  params: HttpParams = new HttpParams();
  periodId: number = 0;
  period?: any;

  constructor(private transactionService: TransactionService,
              private route             : ActivatedRoute,
              private periodService     : PeriodService,
              private modalService      : BsModalService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {

      if(Object.keys(param).length != 0 && Object.keys(param)[0] == 'periodId'){
        this.params = this.params.set('periodId', param['periodId']);
        this.periodId = param['periodId'];
        
        this.periodService.getPeriod(this.periodId).subscribe(res => {
          this.periodService.periodsBS.next(res.result);
          this.period = this.periodService.periodsBS;
        });

      }else{
        this.params = new HttpParams();
      }

      this.transactionService.getTransactions(this.params).subscribe({
        next: (response) => {
          if(response.isSuccess){
            this.transactionService.transactionsBS.next(response.result);
            this.transactions = this.transactionService.transactionsBS;
          }
        }
      });
    });
  }

  deleteTransaction(id: number){
    const delConfirm: boolean = confirm('Are you sure you want to delete this transaction?');

    if(delConfirm){
      this.transactionService.deleteTransaction(id).subscribe({
        next: (response) => {
          if(response.isSuccess){
            this.transactionService.getTransactions(this.params).subscribe(res => {
              this.transactionService.transactionsBS.next(res.result);
            });

            this.periodService.getPeriod(this.periodId).subscribe(res => {
              this.periodService.periodsBS.next(res.result);
            });

          }else{
            this.errorMsg = true;
            this.errorMessages.push(response.errorMessages[0]);
          }
        }
      });
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}