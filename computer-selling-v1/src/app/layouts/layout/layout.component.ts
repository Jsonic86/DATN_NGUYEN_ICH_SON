import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { deleteCookie } from 'src/app/core/utils';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  selectedValue: string = '1';
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onLogOut() {
    deleteCookie('token');
    this.router.navigate(['/auth/login']);
  }
}
