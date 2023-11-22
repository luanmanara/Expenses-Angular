import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../_models/apiresponse';
import { TransactionDTO } from '../_models/dto/transactionDTO';
import { TransactionUpdateDTO } from '../_models/dto/transactionUpdateDTO';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrlEndpoint: string = environment.apiUrl + "transaction/";
  
  constructor(private http : HttpClient) { }

  getTransactions(params: HttpParams){
    return this.http.get<APIResponse<object>>(this.apiUrlEndpoint, {params});
  }

  getTransaction(id: number){
    return this.http.get<APIResponse<TransactionDTO>>(this.apiUrlEndpoint + id);
  }

  createTransaction(transaction : any){
    return this.http.post<APIResponse<object>>(this.apiUrlEndpoint, transaction);
  }

  deleteTransaction(id: number){
    return this.http.delete<APIResponse<object>>(this.apiUrlEndpoint + id);
  }

  updateTransaction(id: number, model: TransactionUpdateDTO){
    return this.http.put<APIResponse<object>>(this.apiUrlEndpoint + id, model);
  }
}
