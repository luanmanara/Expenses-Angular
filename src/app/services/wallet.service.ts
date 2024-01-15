import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { APIResponse } from '../_models/apiresponse';
import { environment } from 'src/environments/environment';
import { WalletCreateDTO } from '../_models/dto/walletCreateDTO';
import { BehaviorSubject } from 'rxjs';
import { WalletDTO } from '../_models/dto/walletDTO';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private apiUrlEndpoint: string = environment.apiUrl + "wallet/";
  public  walletsBS = new BehaviorSubject<object|null>(null);
  public  currentWalletBS = new BehaviorSubject<WalletDTO|null>(null);

  constructor(private http : HttpClient) {}

  getWallets(params: HttpParams){    
    return this.http.get<APIResponse<object>>(this.apiUrlEndpoint, {params});
  }

  getWallet(id : number){
    return this.http.get<APIResponse<WalletDTO>>(this.apiUrlEndpoint + id);
  }

  createWallet(model : WalletCreateDTO){
    return this.http.post<APIResponse<object>>(this.apiUrlEndpoint, model);
  }

}