import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading: boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private notification: NzNotificationService, private router: Router) {

  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.registerForm = this.fb.group({
      username: [''],
      password: [''],
      firstName: [''],
      lastName: [''],
      localDate: ['']
    })
  }
  onRegister() {
    console.log(this.registerForm.getRawValue());
    this.loading = true;
    this.authService.register(this.registerForm.getRawValue()).subscribe(
      (res) => {
        console.log(res);
        this.loading = false;
        this.notification.success('Success', 'Register successfully');
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        console.error('Register error:', error);
        this.notification.error('Error', 'Something went wrong!');
        this.loading = false;
      }
    );
  }
}
