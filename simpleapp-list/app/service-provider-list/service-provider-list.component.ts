import { Component, OnInit } from '@angular/core';
import { BackendService, ServiceProvider } from '~/shared/backend.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-service-provider-list',
  templateUrl: './service-provider-list.component.html',
  styleUrls: ['./service-provider-list.component.css'],
  moduleId: module.id,
})
export class ServiceProviderListComponent implements OnInit {

  constructor(private backendService:BackendService) { }
  serviceProviders: Observable<ServiceProvider[]>;

  ngOnInit() {
    this.serviceProviders = this.backendService.getServiceProviders();
  }

  onItemTap(e){
    const tappedItem = e.view.bindingContext;
    alert(JSON.stringify(tappedItem));
  }


}
