import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { StatusResponse } from 'src/app/core/const/constant';
import { FormItem } from 'src/app/core/const/form.type';
import { UserService } from 'src/app/services/user.service';
import { FormComponent } from 'src/app/shared/component/form/form.component';

@Component({
  selector: 'app-create-update-user',
  templateUrl: './create-update-user.component.html',
  styleUrls: ['./create-update-user.component.scss']
})
export class CreateUpdateUserComponent implements OnInit {
  @Input() id!: string;
  fields: FormItem[] = [
    { id: 1, type: 'text', fieldName: 'username', label: 'Tên đăng nhập', required: false, span: 12, disabled: false },
    { id: 2, type: 'text', fieldName: 'firstName', label: 'Họ', required: true, span: 12, disabled: false },
    { id: 3, type: 'text', fieldName: 'lastName', label: 'Tên', span: 12, disabled: false },
    { id: 4, type: 'text', fieldName: 'dob', label: 'Ngày sinh', span: 12, disabled: false }
  ];
  item: any;
  fieldFormGroup: FormItem[] = [];
  @ViewChild(FormComponent, { static: true }) formComponent!: FormComponent;
  constructor(private modalRef: NzModalRef, private userService: UserService) {
    this.fields.map(field => {
      this.fieldFormGroup.push(new FormItem(field));
    });

  }
  ngOnInit() {
    if (this.id) {
      this.userService.getById(this.id).subscribe(res => {
        if (res.code === StatusResponse.OK) {
          this.item = res.result;
        }
      })
    }
  }
  onCancel() {
    this.modalRef.close();
  }
  onSave() {
    this.modalRef.close(true);
  }
}
