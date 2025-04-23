import { Component, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Column } from 'src/app/core/const/column.type';
import { TYPE } from 'src/app/core/const/constant';
import { SettingValue } from 'src/app/core/const/settingValue.type';

@Component({
  selector: 'app-list-order-detail',
  templateUrl: './list-order-detail.component.html',
  styleUrls: ['./list-order-detail.component.scss']
})
export class ListOrderDetailComponent {
  @Input() data: any = null;
  fieldName: any = ['username', 'firstName', 'lastName', 'localDate'];
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
  constructor(private notification: NzNotificationService, private modalRef: NzModalRef) {
  }
  ngOnInit(): void {
    this.cols = [
      {
        id: '0',
        arr: 'Tên sản phẩm',
        fieldName: 'name',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '1',
        arr: 'Hình ảnh',
        fieldName: 'imageUrl',
        width: '10em',
        type: TYPE.IMAGE,
      },
      {
        id: '2',
        arr: 'Số lượng',
        fieldName: 'quantity',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '3',
        arr: 'Đơn giá',
        fieldName: 'unitPrice',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '4',
        arr: 'Tổng tiền',
        fieldName: 'totalPrice',
        width: '10em',
        type: TYPE.TEXT,
      },
    ]

  }
  ngAfterViewInit() {
    this.data.forEach((element: any) => {
      element.name = element.product.productName;
      element.imageUrl = element.product.imageUrl;
    })
  }
}
