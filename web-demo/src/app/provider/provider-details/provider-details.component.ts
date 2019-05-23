import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SwingService } from 'src/app/swing.service';

@Component({
  selector: 'app-provider-details',
  templateUrl: './provider-details.component.html',
  styleUrls: ['./provider-details.component.css']
})
export class ProviderDetailsComponent implements OnInit {

  public provider$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private swing: SwingService,
  ) { }

  ngOnInit() {
    const providerId = this.route.snapshot.params.id;

    this.provider$ = this.swing.getProvider(providerId);
  }

}
