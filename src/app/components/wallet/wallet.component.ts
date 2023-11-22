import { Component, OnInit } from '@angular/core';
import { APIResponse } from 'src/app/_models/apiresponse';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  wallets: any;

  constructor(private walletService: WalletService) {
  }

  ngOnInit(): void {
    this.walletService.getWallets().subscribe(res => {
      if(res.isSuccess){
        this.wallets = res.result;
      }
    })
  }

}
