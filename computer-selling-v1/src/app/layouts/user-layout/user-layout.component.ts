import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LoginComponent } from 'src/app/auth/login/login/login.component';
import { RegisterComponent } from 'src/app/auth/register/register/register.component';
import { StatusResponse } from 'src/app/core/const/constant';
import { deleteCookie, getCookie } from 'src/app/core/utils';
import { Category } from 'src/app/model/response/category.response';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent {
  selectedValue: string = '1';
  categories: Category[] = [];
  constructor(public authService: AuthService, private router: Router, private modalService: NzModalService, private categoryService: CategoryService, public cartService: CartService) {

  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((res) => {
      if (res.code === StatusResponse.OK) {
        if (res.result.content.length > 0) {
          this.categories = res.result.content;
        }
      }
    })
  }
  onLogOut() {
    deleteCookie('token');
    deleteCookie('roles');
    deleteCookie('userName');
    this.router.navigate(['/user/home']);
  }
  onRegister() {
    const modal = this.modalService.create({
      nzTitle: 'Đăng kí',
      nzContent: RegisterComponent,
      nzWidth: '50%',
      nzMaskClosable: false,
      nzFooter: null,

    })
    modal.afterClose.subscribe((res: any) => {
      if (res == 'login') {
        this.onLogin();
      }
    })
  }
  onLogin() {
    const modal = this.modalService.create({
      nzTitle: 'Đăng nhập',
      nzContent: LoginComponent,
      nzWidth: '30%',
      nzMaskClosable: false,
      nzFooter: null,
    })
    modal.afterClose.subscribe((res: any) => {
      if (res == 'register') {
        this.onRegister();
      }
    })
  }
  getProfile() {

  }
  featuredProducts = [
    {
      name: 'Tai nghe Bluetooth Sony',
      description: 'Âm thanh sống động, pin 24h',
      price: 1290000,
      image: 'https://via.placeholder.com/300x200?text=Sony+Headphone'
    },
    {
      name: 'Laptop Dell Inspiron',
      description: 'Core i5, SSD 512GB',
      price: 15990000,
      image: 'https://via.placeholder.com/300x200?text=Dell+Laptop'
    },
    {
      name: 'Chuột không dây Logitech',
      description: 'Thiết kế ergonomic, pin trâu',
      price: 390000,
      image: 'https://via.placeholder.com/300x200?text=Logitech+Mouse'
    },
    {
      name: 'Smartphone Samsung A73',
      description: 'Màn hình Super AMOLED',
      price: 8990000,
      image: 'https://via.placeholder.com/300x200?text=Samsung+A73'
    }
  ];
  title = 'angular-ui';

  // Toggle chế độ tối
  toggleDarkMode() {
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-white');
  }

  // Hiển thị thông báo toast
  showToast() {
    // const toast = new Toast(document.getElementById('successToast') as HTMLElement);
    // toast.show();
  }
  getUserName() {
    return getCookie('userName');
  }
  redirectToListOrders() {
    this.router.navigate(['user/list-order']);
  }
}
