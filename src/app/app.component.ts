import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'webzoologico';
  titlePage = '';

  constructor(@Inject(DOCUMENT) private document: Document){

  }
  ngOnInit(): void {
    //this.document.body.classList.add('bg-gradient-primary');
  }
}
