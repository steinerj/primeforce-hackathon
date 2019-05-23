import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, skip, switchMap } from 'rxjs/operators';
import { SwingService } from 'src/app/swing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {
  public providers$: Observable<any[]>;
  public selectedProvider$: BehaviorSubject<any>;
  public projects$: Observable<any[]>;

  public searchTerm$ = new BehaviorSubject('');

  constructor(
    private router: Router,
    private swing: SwingService
    ) { }

  ngOnInit() {
    this.providers$ = combineLatest(this.swing.getProviders(), this.searchTerm$,
    (data: any[], filter) => {
      return data.filter(item => item.name.includes(filter));
    })
    .pipe(
      map(items => items.slice(0, 10))
    );

    this.selectedProvider$ = new BehaviorSubject(null);

    this.projects$ = this.selectedProvider$
    .pipe(
      skip(1),
      switchMap(provider => this.swing.getProjectsForProvider(provider))
    );
  }

  showDetails(provider: any) {
    const id = this.swing.parseId(provider);

    this.router.navigate(['providers', id]);
  }

  selectProvider(provider: any) {
    this.selectedProvider$.next(provider);
  }

  filter(searchTerm) {
    console.log(searchTerm);
    this.searchTerm$.next(searchTerm);
  }
}


