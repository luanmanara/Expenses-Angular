import { HttpParams } from '@angular/common/http';
import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeriodService } from 'src/app/services/period.service';
import { WalletService } from 'src/app/services/wallet.service';
import { PeriodUpdateDTO } from 'src/app/_models/dto/periodUpdateDTO';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css']
})
export class PeriodComponent implements OnInit {

  periods : any;
  params: HttpParams = new HttpParams();
  walletId: number = 0;

  constructor(private periodService : PeriodService,
              private walletService : WalletService,
              private route         : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {

      if(Object.keys(param).length != 0 && Object.keys(param)[0] == 'walletId'){
        this.params = this.params.set('walletId', param['walletId']);
        this.walletId = param['walletId'];
      }else{
        this.params = new HttpParams();
      }

      this.periodService.getPeriods(this.params).subscribe({
        next: (response) => {
          if(response.isSuccess){
            this.periods = response.result;
          }
        },
        error: (e) => console.error(e),
        complete: () => {
          this.periods.forEach((element: { walletId: number; }, key: number) => {
            this.walletService.getWallet(element.walletId).subscribe({
              next: (response) => {
                this.periods[key].wallet = response.result;
              }
            })
          });
        }
      });

    });
    
  }

  closePeriod(id: number){
    const model: PeriodUpdateDTO = {
      id: id,
      isClosed: true
    };

    this.periodService.closePeriod(id, model).subscribe({
      next: (response) => {
        if(response.isSuccess){
          this.ngOnInit();
        }
      }
    });
  }

}
