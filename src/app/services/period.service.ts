import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse } from '../_models/apiresponse';
import { environment } from 'src/environments/environment';
import { PeriodUpdateDTO } from '../_models/dto/periodUpdateDTO';
import { BehaviorSubject } from 'rxjs';
import { PeriodDTO } from '../_models/dto/periodDTO';

@Injectable({
  providedIn: 'root'
})

export class PeriodService {

  private apiUrlEndpoint: string = environment.apiUrl + "period/";
  public  periodsBS = new BehaviorSubject<object|null>(null);
  public  currentPeriodBS = new BehaviorSubject<PeriodDTO|null>(null);
  
  constructor(private http : HttpClient) { }

  getPeriods(params?: HttpParams){
    return this.http.get<APIResponse<object>>(this.apiUrlEndpoint, {params});
  }

  getPeriod(id: number){
    return this.http.get<APIResponse<PeriodDTO>>(this.apiUrlEndpoint + id);
  }

  createPeriod(period : any){
    return this.http.post<APIResponse<object>>(this.apiUrlEndpoint, period);
  }

  closePeriod(id: number, period : PeriodUpdateDTO){
    return this.http.put<APIResponse<object>>(this.apiUrlEndpoint + id, period);
  }
}
