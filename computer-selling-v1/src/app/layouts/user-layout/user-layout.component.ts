import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { deleteCookie } from 'src/app/core/utils';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent {
  selectedValue: string = '1';
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onLogOut() {
    deleteCookie('token');
    deleteCookie('roles');
    this.router.navigate(['/auth/login']);
  }
}
