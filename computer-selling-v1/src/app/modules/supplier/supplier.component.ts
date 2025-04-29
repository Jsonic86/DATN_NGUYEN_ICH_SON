import { Component } from '@angular/core';
import { ConfirmComponent } from 'src/app/shared/component/confirm/confirm.component';
import { CreateUpdateCategoryComponent } from '../category/create-update-category/create-update-category.component';
import { StatusResponse, TYPE } from 'src/app/core/const/constant';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { getCookie } from 'src/app/core/utils';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SupplierService } from 'src/app/services/supplier.service';
import { Column } from 'src/app/core/const/column.type';
import { SettingValue } from 'src/app/core/const/settingValue.type';
import { CreateUpdateSupplierComponent } from './create-update-supplier/create-update-supplier.component';
import { Supplier } from 'src/app/model/response/supplier.response';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent {
  data: Supplier[] = [];
  token: string | null = '';
  settingValue: SettingValue = {
    size: 'middle',
    border: true,
    checkBox: false
  }
  cols: Column[] = [];
  loading: boolean = false;
  totalElements: number = 0;
  page: number = 0;
  pageSize: number = 10;
  searchQuery: string = '';
  searchSubject: Subject<string> = new Subject<string>();
  constructor(private modalService: NzModalService, private notification: NzNotificationService, private supplierSerivce: SupplierService) {
    this.token = getCookie('token');
  }
  ngOnInit(): void {
    this.cols = [
      {
        id: '0',
        arr: 'Tên nhà cung cấp',
        fieldName: 'supplierName',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '1',
        arr: 'Người liên hệ',
        fieldName: 'contactPerson',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '2',
        arr: 'Số điện thoại',
        fieldName: 'phone',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '3',
        arr: 'Email',
        fieldName: 'email',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '4',
        arr: 'Địa chỉ',
        fieldName: 'address',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '5',
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
    this.searchSubject.pipe(
      debounceTime(300),  // Đợi 300ms sau khi người dùng dừng nhập
      distinctUntilChanged(),  // Chỉ thực hiện khi giá trị thay đổi
      switchMap(searchTerm => {
        return this.supplierSerivce.getAllsuppliers({ page: 0, size: this.pageSize, name: searchTerm });  // Gọi API với từ khóa tìm kiếm
      })
    ).subscribe(res => {
      if (res.code === StatusResponse.OK && res.result?.content.length > 0) {
        this.data = res.result?.content;
        this.page = res.result?.number + 1;
        this.totalElements = res.result?.totalElements;
        this.pageSize = res.result?.size;
        this.loading = false;
      }
    });
  }
  ngAfterViewInit() {
    if (this.token) {
      this.getAllsuppliers();
    }
  }
  getAllsuppliers(payload: any = {}) {
    this.loading = true;
    this.supplierSerivce.getAllsuppliers(payload).subscribe((res: any) => {
      if (res.code === StatusResponse.OK && res.result?.content.length > 0) {
        this.data = res.result?.content;
        this.page = res.result?.number + 1;
        this.totalElements = res.result?.totalElements;
        this.pageSize = res.result?.size;
        this.loading = false;
      }
    });
  }
  onSearch() {
    this.searchSubject.next(this.searchQuery);
  }
  onEdit(e: any) {
    const modal = this.modalService.create({
      nzTitle: 'Sửa thông tin nhà cung cấp',
      nzContent: CreateUpdateSupplierComponent,
      nzWidth: '50%',
      nzMask: false,
      nzFooter: null
    })
    modal.componentInstance!.id = e?.id;
    modal.afterClose.subscribe((res) => {
      if (res === true) {
        this.getAllsuppliers({ page: this.page - 1, size: this.pageSize });
      }
    })
  }
  onCreate() {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới nhà cung cấp',
      nzContent: CreateUpdateSupplierComponent,
      nzWidth: '50%',
      nzMask: false,
      nzFooter: null
    })
    modal.afterClose.subscribe((res) => {
      if (res === true) {
        this.getAllsuppliers({ page: this.page - 1, size: this.pageSize });
      }
    })
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
        this.supplierSerivce.deleteById(e.id.toString()).subscribe((response: any) => {
          if (response.code === StatusResponse.OK) {
            this.notification.success('Success', 'Xóa thành công');
            this.getAllsuppliers({ page: this.page - 1, size: this.pageSize });
          } else {
            this.notification.error('Error', response.message);
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
  onPageChange(page: number) {
    this.page = page - 1;
    this.getAllsuppliers({ page: this.page });
  }
  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.page = 0;
    this.getAllsuppliers({ size: this.pageSize });
  }
}
