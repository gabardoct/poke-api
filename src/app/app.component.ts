import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navLinks: any[];

  constructor() {
    this.navLinks = [
      { path: '/', label: 'Home' },
      { path: 'pokemon', label: 'Pokemon' },
      { path: 'items', label: 'Items' },
    ];

  }
}
