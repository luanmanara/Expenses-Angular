import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIResponse } from 'src/app/_models/apiresponse';
import { UserService } from 'src/app/services/user.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  wallets: any;
  userId: string = '';
  httpParams: HttpParams = new HttpParams();

  constructor(private walletService: WalletService,
              private route        : ActivatedRoute,
              private userService  : UserService) {
  }

  ngOnInit(): void {

      if (this.userService.currentUserBS.value)
        this.userId = this.userService.currentUserBS.value?.user.id;

      this.httpParams = this.httpParams.set('userId', this.userId);

      this.walletService.getWallets(this.httpParams).subscribe(res => {
        if (res.isSuccess) {
          this.wallets = res.result;
        }
      });
  }

}
