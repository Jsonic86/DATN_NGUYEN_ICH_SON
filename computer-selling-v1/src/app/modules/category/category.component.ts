import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Column } from 'src/app/core/const/column.type';
import { StatusResponse, TYPE } from 'src/app/core/const/constant';
import { SettingValue } from 'src/app/core/const/settingValue.type';
import { getCookie } from 'src/app/core/utils';
import { CategoryService } from 'src/app/services/category.service';
import { ConfirmComponent } from 'src/app/shared/component/confirm/confirm.component';
import { CreateUpdateCategoryComponent } from './create-update-category/create-update-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  data: any;
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
  constructor(private modalService: NzModalService, private notification: NzNotificationService, private categorySerivce: CategoryService) {
    this.token = getCookie('token');
  }
  ngOnInit(): void {
    this.cols = [
      {
        id: '0',
        arr: 'Tên danh mục',
        fieldName: 'categoryName',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '1',
        arr: 'Mô tả',
        fieldName: 'categoryDescription',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '3',
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
        return this.categorySerivce.getAllCategories({ page: 0, size: this.pageSize, name: searchTerm });  // Gọi API với từ khóa tìm kiếm
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
      this.getAllCategories();
    }
  }
  getAllCategories(payload: any = {}) {
    this.loading = true;
    this.categorySerivce.getAllCategories(payload).subscribe((res: any) => {
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
      nzTitle: 'Sửa thông tin danh mục',
      nzContent: CreateUpdateCategoryComponent,
      nzWidth: '50%',
      nzMask: false,
      nzFooter: null
    })
    modal.componentInstance!.id = e?.categoryId;
    modal.afterClose.subscribe((res) => {
      if (res === true) {
        this.getAllCategories({ page: this.page - 1, size: this.pageSize });
      }
    })
  }
  onCreate() {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới danh mục',
      nzContent: CreateUpdateCategoryComponent,
      nzWidth: '50%',
      nzMask: false,
      nzFooter: null
    })
    modal.afterClose.subscribe((res) => {
      if (res === true) {
        this.getAllCategories({ page: this.page - 1, size: this.pageSize });
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
        this.categorySerivce.deleteById(e.categoryId.toString()).subscribe((response: any) => {
          if (response.code === StatusResponse.OK) {
            this.notification.success('Success', 'Xóa thành công');
            this.getAllCategories({ page: this.page - 1, size: this.pageSize });
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
    this.getAllCategories({ page: this.page });
  }
  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.page = 0;
    this.getAllCategories({ size: this.pageSize });
  }
}
