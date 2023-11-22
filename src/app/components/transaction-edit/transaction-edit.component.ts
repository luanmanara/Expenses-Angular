import { DatePipe, formatDate } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
export class TransactionEditComponent implements OnInit {

  id: number = 0;
  periodId?: number;
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

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: async (param) => {
        this.getTransaction(param['id']);        
      }
    });
  }

  updateTransaction(form: NgForm){
    const model: TransactionUpdateDTO = form.value;
    this.transactionService.updateTransaction(model.id, model).subscribe({
      next: (response) => {
        if(response.isSuccess){
          this.successMsg = true;
        }else {
          this.errorMsg = true;
          this.errorMessages.push(response.errorMessages[0]);
        }
      },
      complete: () => {
        this.router.navigate(['/transactions'], {queryParams: {periodId: this.periodId}});
      }
    });
  }

  getTransaction(id: number) {
    if(id != 0){
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
