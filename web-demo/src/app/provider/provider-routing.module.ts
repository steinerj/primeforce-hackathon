import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProvidersComponent } from './providers/providers.component';
import { ProviderDetailsComponent } from './provider-details/provider-details.component';

const routes: Routes = [
  { path: '', component: ProvidersComponent },
  { path: ':id', component: ProviderDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
