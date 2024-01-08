import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionUpdateDTO } from 'src/app/_models/dto/transactionUpdateDTO';
import { PeriodService } from 'src/app/services/period.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.css']
})
export class TransactionEditComponent implements OnInit, OnChanges {

  @Input() transactionId: number = 0;

  id: number = 0;
  periodId: number = 0;
  value?: number;
  transactionType?: number;
  description?: string;
  dateOfMovement?: string;
  period: any = {id: 0, month: ''};

  // error validations
  errorMsg: boolean = false;
  successMsg: boolean = false;
  errorMessages: Array<string> = [];

  constructor(private transactionService: TransactionService,
              private route             : ActivatedRoute,
              private datePipe          : DatePipe,
              private periodService     : PeriodService,
              private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['transactionId']){
      this.getTransaction(this.transactionId);
    }
  }

  ngOnInit(): void {
  }

  updateTransaction(form: NgForm){
    const model: TransactionUpdateDTO = form.value;
    this.transactionService.updateTransaction(model.id, model).subscribe({
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

          this.successMsg = true;
          
          setTimeout(() =>{ this.successMsg = false; }, 1000);

        }else {
          this.errorMsg = true;
          this.errorMessages.push(response.errorMessages[0]);

          setTimeout(() => { this.errorMsg = false; this.errorMessages.pop(); }, 1000);
        }
      }
    });
  }

  getTransaction(id: number) {
    if(id){
      this.transactionService.getTransaction(id).subscribe({
        next: (response) => {
          if(response.isSuccess && response.statusCode == 200){
            this.id = response.result.id;
            this.periodId = response.result.periodId;
            this.value = response.result.value;
            this.transactionType = response.result.transactionType;
            this.description = response.result.description;
            
            // format date
            let date = new Date(response.result.dateOfMovement);
            let dateString = this.datePipe.transform(date, "yyyy-MM-dd");

            if(dateString != null){
              this.dateOfMovement =  dateString;
            }
          }
        },
        complete: () => {
          if(this.periodId != undefined)
            this.getPeriod(this.periodId);
        }
      });
    }
  }

  getPeriod(periodId: number){
    this.periodService.getPeriod(periodId).subscribe(res => {
      this.period = res.result;
    });
  }
}
