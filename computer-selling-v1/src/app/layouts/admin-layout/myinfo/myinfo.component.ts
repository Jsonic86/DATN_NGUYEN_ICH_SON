import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StatusResponse } from 'src/app/core/const/constant';
import { FormItem } from 'src/app/core/const/form.type';
import { UserService } from 'src/app/services/user.service';
import { FormComponent } from 'src/app/shared/component/form/form.component';

@Component({
  selector: 'app-myinfo',
  templateUrl: './myinfo.component.html',
  styleUrls: ['./myinfo.component.scss']
})
export class MyinfoComponent implements OnInit {
  infor!: any;
  item!: any;
  updateForm!: FormGroup;
  keys: any = {
    firstName: "First Name",
    lastName: "Last Name",
    dob: "Date of birth"
  };
  keysEmployee: any = {
    email: "Email",
    phoneNumber: "Phone Number",
  };
  keysName: any;
  keysNameEmployee: any;
  fields: FormItem[] = [
    { id: 1, type: 'text', fieldName: 'firstName', label: 'Họ', required: false, span: 12, disabled: false },
    { id: 2, type: 'text', fieldName: 'lastName', label: 'Tên', required: false, span: 12, disabled: false },
    { id: 3, type: 'text', fieldName: 'dob', label: 'Ngày sinh', required: false, span: 12, disabled: false },
    { id: 4, type: 'text', fieldName: 'email', label: 'Email', required: false, span: 12, disabled: false },
    { id: 4, type: 'text', fieldName: 'phoneNumber', label: 'Số điện thoại', required: false, span: 12, disabled: false },
  ];
  fieldFormGroup: FormItem[] = [];
  @ViewChild(FormComponent, { static: true }) formComponent!: FormComponent;
  constructor(private userService: UserService, private modalRef: NzModalRef, private notification: NzNotificationService) {
    this.keysName = Object.keys(this.keys);
    this.keysNameEmployee = Object.keys(this.keysEmployee);
    this.fields.map(field => {
      this.fieldFormGroup.push(new FormItem(field));
    });
  }
  ngOnInit(): void {
    this.getInfor();
  }
  getInfor() {
    this.userService.getInfo().subscribe((res: any) => {
      this.infor = res?.result;
      this.item = res?.result;
      this.item.email = res?.result.employee.email;
      this.item.phoneNumber = res?.result.employee.phoneNumber;
    })
  }
  onCancel() {
    this.modalRef.close();
  }
  onSave() {
    const payload: any = {
      firstName: this.formComponent.myForm.get('firstName')?.value,
      lastName: this.formComponent.myForm.get('lastName')?.value,
      dob: this.formComponent.myForm.get('dob')?.value,
      email: this.formComponent.myForm.get('email')?.value,
      phoneNumber: this.formComponent.myForm.get('phoneNumber')?.value,
    };
    this.userService.updateEmployee(payload).subscribe(res => {
      if (res.code === StatusResponse.OK) {
        this.notification.success('Success', 'Chỉnh sửa thông tin cá nhân thành công');
        this.modalRef.close(true);

      }
    })
  }
}
