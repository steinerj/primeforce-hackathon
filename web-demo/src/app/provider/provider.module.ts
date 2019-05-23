import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvidersComponent } from './providers/providers.component';
import { ProviderDetailsComponent } from './provider-details/provider-details.component';
import { ProviderRoutingModule } from './provider-routing.module';
import { ProjectViewComponent } from './project-view/project-view.component';

@NgModule({
  declarations: [
    ProvidersComponent,
    ProviderDetailsComponent,
    ProjectViewComponent,
  ],
  imports: [
    CommonModule,
    ProviderRoutingModule
  ]
})
export class ProviderModule { }
