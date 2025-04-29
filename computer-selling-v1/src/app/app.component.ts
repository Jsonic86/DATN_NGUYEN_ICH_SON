import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { deleteCookie, getCookie } from './core/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'computer-selling-v1';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }


}
