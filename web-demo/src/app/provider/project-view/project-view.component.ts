import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {
  @Input() source: any;
  constructor() { }

  ngOnInit() {
  }

}
