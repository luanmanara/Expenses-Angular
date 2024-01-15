import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodService } from 'src/app/services/period.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { last, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  // modal
  @ViewChild('modal') modal?: GenericModalComponent;
  modalType: string = '';
  modalRef: BsModalRef = new BsModalRef();

  // error handling
  errorMsg: boolean = false;
  errorMessages: Array<string> = [];

  transactions: any;
  params: HttpParams = new HttpParams();
  period?: any;
  editTransactionId: number = 0;

  constructor(private transactionService: TransactionService,
              private periodService     : PeriodService,
              private modalService      : BsModalService,
              private router            : Router) { }

  async ngOnInit(): Promise<void> {

    if(this.periodService.currentPeriodBS.value != null){
      this.period = this.periodService.currentPeriodBS;
    }else {
       this.router.navigate(['/periods']);
       return;
    }

    this.params = this.params.set('periodId', this.period?.value.id);

    const getTransactionResponse = await lastValueFrom(this.transactionService.getTransactions(this.params));
    
    if(getTransactionResponse.isSuccess){
      this.transactionService.transactionsBS.next(getTransactionResponse.result);
      this.transactions = this.transactionService.transactionsBS;
    }

  }

  async deleteTransaction(id: number){
    const deleteConfirmation: boolean = confirm('Are you sure you want to delete this transaction?');

    if(deleteConfirmation){
      const deleteTransactionResponse = await lastValueFrom(this.transactionService.deleteTransaction(id));
      
      if(deleteTransactionResponse.isSuccess){
        // Update Transaction BS
        const getTransactionsResponse = await lastValueFrom(this.transactionService.getTransactions(this.params));
        this.transactionService.transactionsBS.next(getTransactionsResponse.result);

        // Update Period BS
        const getPeriodResponse = await lastValueFrom(this.periodService.getPeriod(this.period?.value.id));
        this.periodService.currentPeriodBS.next(getPeriodResponse.result);

      }else{
        this.errorMsg = true;
        this.errorMessages.push(deleteTransactionResponse.errorMessages[0]);
      }
    }
  }

  async openModal(type: string, id: number){

    if(type == 'Edit'  && id != 0) {
      const getTransactionResponse = await lastValueFrom(this.transactionService.getTransaction(id));
      if (getTransactionResponse.isSuccess) {
        this.transactionService.currentTransactionBS.next(getTransactionResponse.result);
      }
    }

    this.modalType = type;

    if(this.modal && this.modal.template) {
      this.modalRef = this.modalService.show(this.modal.template);
      this.modal.hideModal = () => {
        this.modalType = '';
        this.modalRef.hide();
      };
    }

  }
}