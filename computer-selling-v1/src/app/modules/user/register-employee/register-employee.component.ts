import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { USER_TYPE } from 'src/app/core/const/constant';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.scss']
})
export class RegisterEmployeeComponent {
  registerForm!: FormGroup;
  loading: boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private notification: NzNotificationService, private modalRef: NzModalRef) {

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
      dob: ['']
    })
  }
  onRegister() {
    console.log(this.registerForm.getRawValue());
    this.loading = true;
    this.authService.register({ ...this.registerForm.getRawValue(), userType: USER_TYPE.EMPLOYEE, roles: ['ADMIN'] }).subscribe(
      (res) => {
        console.log(res);
        this.loading = false;
        this.notification.success('Success', 'Register successfully');
        this.modalRef.close(true);
      },
      (error) => {
        console.error('Register error:', error);
        this.notification.error('Error', 'Something went wrong!');
        this.loading = false;
      }
    );
  }
}
