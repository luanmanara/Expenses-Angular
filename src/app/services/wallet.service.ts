import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { APIResponse } from '../_models/apiresponse';
import { environment } from 'src/environments/environment';
import { WalletCreateDTO } from '../_models/dto/walletCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  apiUrlEndpoint: string = environment.apiUrl + "wallet/";

  constructor(private http : HttpClient) {}

  getWallets(){    
    return this.http.get<APIResponse<object>>(this.apiUrlEndpoint);
  }

  getWallet(id : number){
    return this.http.get<APIResponse<object>>(this.apiUrlEndpoint + id);
  }

  createWallet(model : WalletCreateDTO | any){
    return this.http.post<APIResponse<object>>(this.apiUrlEndpoint, model);
  }

}