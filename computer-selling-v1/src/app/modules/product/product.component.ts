import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Column } from 'src/app/core/const/column.type';
import { StatusResponse, TYPE } from 'src/app/core/const/constant';
import { SettingValue } from 'src/app/core/const/settingValue.type';
import { getCookie } from 'src/app/core/utils';
import { ProductService } from 'src/app/services/product.service';
import { ConfirmComponent } from 'src/app/shared/component/confirm/confirm.component';
import { CreateUpdateProductComponent } from './create-update-product/create-update-product.component';
import { ProductItemResponse } from 'src/app/model/response/product.response';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  data: any;
  fieldName: any = ['username', 'firstName', 'lastName', 'localDate'];
  token: string | null = '';
  settingValue: SettingValue = {
    size: 'middle',
    border: true,
    checkBox: false
  }
  cols: Column[] = [];
  constructor(private productSerivce: ProductService, private modalService: NzModalService, private notification: NzNotificationService) {
    this.token = getCookie('token');
  }
  ngOnInit(): void {
    this.cols = [
      {
        id: '0',
        arr: 'Tên sản phẩm',
        fieldName: 'productName',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '1',
        arr: 'Tên danh mục',
        fieldName: 'categoryName',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '2',
        arr: 'Giá',
        fieldName: 'price',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '3',
        arr: 'Số lượng tồn kho',
        fieldName: 'stockQuantity',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '4',
        arr: 'Ảnh',
        fieldName: 'imageUrl',
        width: '10em',
        type: TYPE.IMAGE,
      },
      {
        id: '5',
        arr: 'Mô tả',
        fieldName: 'description',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '6',
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
      this.getAllProducts();
    }
  }
  getAllProducts() {
    this.productSerivce.getAllProducts().subscribe((res: any) => {
      if (res.code === StatusResponse.OK) {
        this.data = res.result;
      }
    });
  }

  onEdit(e: ProductItemResponse) {
    const modal = this.modalService.create({
      nzTitle: 'Sửa thông tin người dùng',
      nzContent: CreateUpdateProductComponent,
      nzWidth: '30%',
      nzMask: false,
      nzFooter: null
    })
    modal.componentInstance!.id = e?.productId;
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
        this.productSerivce.deleteById(e.id).subscribe((response: any) => {
          if (response.code === StatusResponse.OK) {
            this.notification.success('Success', 'Login successfully');
            this.getAllProducts();
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
}
