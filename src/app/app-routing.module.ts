import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletComponent } from './components/wallet/wallet.component';
import { WalletCreateComponent } from './components/wallet-create/wallet-create.component';
import { PeriodComponent } from './components/period/period.component';
import { PeriodCreateComponent } from './components/period-create/period-create.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionCreateComponent } from './components/transaction-create/transaction-create.component';
import { TransactionEditComponent } from './components/transaction-edit/transaction-edit.component';

const routes: Routes = [
  {path: 'wallets', component: WalletComponent},
  {path: 'wallets/create', component: WalletCreateComponent},
  {path: 'periods', component: PeriodComponent},
  {path: 'periods/create', component: PeriodCreateComponent},
  {path: 'transactions', component: TransactionComponent},
  {path: 'transactions/create', component: TransactionCreateComponent},
  {path: 'transactions/edit', component: TransactionEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
