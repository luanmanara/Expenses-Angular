import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { APIResponse } from '../_models/apiresponse';
import { environment } from 'src/environments/environment';
import { WalletCreateDTO } from '../_models/dto/walletCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  apiUrlEndpoint: string = environment.apiUrl + "wallet/";

  constructor(private http : HttpClient) {}

  getWallets(params: HttpParams){    
    return this.http.get<APIResponse<object>>(this.apiUrlEndpoint, {params});
  }

  getWallet(id : number){
    return this.http.get<APIResponse<object>>(this.apiUrlEndpoint + id);
  }

  createWallet(model : WalletCreateDTO | any){
    return this.http.post<APIResponse<object>>(this.apiUrlEndpoint, model);
  }

}