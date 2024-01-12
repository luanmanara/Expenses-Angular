import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletComponent } from './components/wallet/wallet.component';
import { WalletCreateComponent } from './components/wallet-create/wallet-create.component';
import { PeriodComponent } from './components/period/period.component';
import { PeriodCreateComponent } from './components/period-create/period-create.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionCreateComponent } from './components/transaction-create/transaction-create.component';
import { TransactionEditComponent } from './components/transaction-edit/transaction-edit.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { authGuard } from './_guards/auth.guard';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', component: UserLoginComponent},
  {path: 'login', component: UserLoginComponent},
  {path: 'register', component: UserRegisterComponent},
  {path: 'wallets', component: WalletComponent, canActivate: [authGuard]},
  {path: 'wallets/create', component: WalletCreateComponent, canActivate: [authGuard]},
  {path: 'periods', component: PeriodComponent, canActivate: [authGuard]},
  {path: 'periods/create', component: PeriodCreateComponent, canActivate: [authGuard]},
  {path: 'transactions', component: TransactionComponent, canActivate: [authGuard]},
  {path: 'transactions/create', component: TransactionCreateComponent, canActivate: [authGuard]},
  {path: 'transactions/edit', component: TransactionEditComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
