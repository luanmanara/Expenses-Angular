import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// Services
import { WalletService } from './services/wallet.service';
import { WalletComponent } from './components/wallet/wallet.component';
import { HttpClientModule } from '@angular/common/http';
import { WalletCreateComponent } from './components/wallet-create/wallet-create.component';
import { FormsModule } from '@angular/forms';
import { PeriodComponent } from './components/period/period.component';
import { PeriodCreateComponent } from './components/period-create/period-create.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionCreateComponent } from './components/transaction-create/transaction-create.component';
import { TransactionEditComponent } from './components/transaction-edit/transaction-edit.component';
import { DatePipe } from '@angular/common';
import { TransactionService } from './services/transaction.service';
import { PeriodService } from './services/period.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WalletComponent,
    WalletCreateComponent,
    PeriodComponent,
    PeriodCreateComponent,
    TransactionComponent,
    TransactionCreateComponent,
    TransactionEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [WalletService, PeriodService, TransactionService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
