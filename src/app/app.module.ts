import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// Services
import { WalletService } from './services/wallet.service';
import { TransactionService } from './services/transaction.service';
import { PeriodService } from './services/period.service';
import { UserService } from './services/user.service';

//Components
import { WalletComponent } from './components/wallet/wallet.component';
import { WalletCreateComponent } from './components/wallet-create/wallet-create.component';
import { PeriodComponent } from './components/period/period.component';
import { PeriodCreateComponent } from './components/period-create/period-create.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionCreateComponent } from './components/transaction-create/transaction-create.component';
import { TransactionEditComponent } from './components/transaction-edit/transaction-edit.component';
import { GenericModalComponent } from './components/generic-modal/generic-modal.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';

// Bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { BackButtonComponent } from './components/back-button/back-button.component';

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
    GenericModalComponent,
    UserLoginComponent,
    UserRegisterComponent,
    BackButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers: [WalletService, PeriodService, TransactionService, UserService, DatePipe, provideNgxMask(), BsModalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
