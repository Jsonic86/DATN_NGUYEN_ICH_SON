import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonResponse } from 'src/app/model/response/common.response';
import { LoginResponse } from 'src/app/model/response/login.response';
import { AuthService } from 'src/app/services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StatusResponse } from 'src/app/core/const/constant';
import { NzModalRef } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading: boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private notification: NzNotificationService, private modalRef: NzModalRef) {

  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    })
  }

  login() {
    console.log('Submitting:', this.loginForm.getRawValue());
    this.loading = true;

    this.authService.login(this.loginForm.getRawValue()).subscribe(
      (res: CommonResponse<LoginResponse>) => {
        console.log('Response:', res); // ✅ In response ra kiểm tra

        if (res.code === StatusResponse.OK) {
          this.modalRef.close();
          this.notification.success('Success', 'Đăng nhập thành công');
        } else {
          this.notification.error('Error', res.message);
        }

        this.loading = false;

      },
      (error) => {
        console.error('Login error:', error); // ✅ In lỗi nếu API bị lỗi
        this.notification.error('Error', 'Something went wrong!');
        this.loading = false;
      }
    );
  }
  onRegister() {
    this.modalRef.close('register');
  }
}
