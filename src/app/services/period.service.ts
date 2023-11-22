import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse } from '../_models/apiresponse';
import { environment } from 'src/environments/environment';
import { PeriodUpdateDTO } from '../_models/dto/periodUpdateDTO';

@Injectable({
  providedIn: 'root'
})

export class PeriodService {

  private apiUrlEndpoint: string = environment.apiUrl + "period/";
  
  constructor(private http : HttpClient) { }

  getPeriods(params?: HttpParams){
    return this.http.get<APIResponse<object>>(this.apiUrlEndpoint, {params});
  }

  getPeriod(id: number){
    return this.http.get<APIResponse<object>>(this.apiUrlEndpoint + id);
  }

  createPeriod(period : any){
    return this.http.post<APIResponse<object>>(this.apiUrlEndpoint, period);
  }

  closePeriod(id: number, period : PeriodUpdateDTO){
    return this.http.put<APIResponse<object>>(this.apiUrlEndpoint + id, period);
  }
}
