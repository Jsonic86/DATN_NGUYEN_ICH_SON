import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Column } from 'src/app/core/const/column.type';
import { StatusResponse, TYPE } from 'src/app/core/const/constant';
import { SettingValue } from 'src/app/core/const/settingValue.type';
import { getCookie } from 'src/app/core/utils';
import { UserService } from 'src/app/services/user.service';
import { ConfirmComponent } from 'src/app/shared/component/confirm/confirm.component';
import { CreateUpdateUserComponent } from './create-update-user/create-update-user.component';
import { RegisterComponent } from 'src/app/auth/register/register/register.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  data: any;
  fieldName: any = ['username', 'firstName', 'lastName', 'localDate'];
  token: string | null = '';
  settingValue: SettingValue = {
    size: 'middle',
    border: true,
    checkBox: false
  }
  cols: Column[] = [];
  constructor(private userSerivce: UserService, private modalService: NzModalService, private notification: NzNotificationService) {
    this.token = getCookie('token');
  }
  ngOnInit(): void {
    this.cols = [
      {
        id: '0',
        arr: 'Tên đăng nhập',
        fieldName: 'username',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '1',
        arr: 'Họ',
        fieldName: 'firstName',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '2',
        arr: 'Tên',
        fieldName: 'lastName',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '3',
        arr: 'Ngày sinh',
        fieldName: 'dob',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '4',
        arr: 'Thao tác',
        fieldName: 'action',
        type: TYPE.ACTION,
        width: '5em',
        listOfAction: [
          {
            actionName: 'edit',
            icon: 'edit',
            keyName: 'edit'
          },
          {
            actionName: 'delete',
            icon: 'delete',
            keyName: 'delete'
          }
        ]
      },
    ]

  }
  ngAfterViewInit() {
    if (this.token) {
      this.getAllUsers();
    }
  }
  getAllUsers() {
    this.userSerivce.getAllUsers().subscribe((res: any) => {
      if (res.code === StatusResponse.OK) {
        this.data = res.result;
      }
    });
  }

  onEdit(e: any) {
    const modal = this.modalService.create({
      nzTitle: 'Sửa thông tin người dùng',
      nzContent: CreateUpdateUserComponent,
      nzWidth: '30%',
      nzMask: false,
      nzFooter: null
    })
    modal.componentInstance!.id = e?.id;
  }
  onDelete(e: any) {
    const modal = this.modalService.create({
      nzTitle: 'Xác nhận xóa',
      nzContent: ConfirmComponent,
      nzWidth: '30%',
      // nzStyle: { borderRadius: '12px', overflow: 'hidden' },
      nzMask: false,
      nzFooter: null
    })
    modal.componentInstance!.action = 'Xóa';
    modal.afterClose.subscribe((res) => {
      if (res) {
        this.userSerivce.deleteById(e.id).subscribe((response: any) => {
          if (response.code === StatusResponse.OK) {
            this.notification.success('Thông báo', 'Đăng nhập thành công');
            this.getAllUsers();
          } else {
            this.notification.error('Lỗi', response.message);
          }
        })
      }
    })
  }
  onAction(e: any) {
    switch (e.actionName) {
      case 'edit':
        this.onEdit(e.data);
        break;
      case 'delete':
        this.onDelete(e.data);
        break;
    }
  }
  onCreateEmpoyeeAccount() {
    const modal = this.modalService.create({
      nzTitle: 'Tạo tài khoản nhân viên',
      nzContent: RegisterEmployeeComponent,
      nzWidth: '50%',
      nzMaskClosable: false,
      nzFooter: null,
    })
    modal.afterClose.subscribe((res) => {
      if (res === true) {
        this.getAllUsers();
      }
    })
  }
}
