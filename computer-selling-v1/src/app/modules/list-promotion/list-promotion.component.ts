import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Column } from 'src/app/core/const/column.type';
import { PROMOTION_STATUS, StatusResponse, TYPE, TYPE_UPDATE_STATUS, convertValue } from 'src/app/core/const/constant';
import { SettingValue } from 'src/app/core/const/settingValue.type';
import { getCookie } from 'src/app/core/utils';
import { PromotionService } from 'src/app/services/promotion.service';
import { ListOrderDetailComponent } from '../list-order/list-order-detail/list-order-detail.component';
import { UpdateStatusComponent } from '../list-order-admin/update-status/update-status.component';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { CreateUpdatePromotionComponent } from './create-update-promotion/create-update-promotion.component';
import { Promotion } from 'src/app/model/response/promotion.response';

@Component({
  selector: 'app-list-promotion',
  templateUrl: './list-promotion.component.html',
  styleUrls: ['./list-promotion.component.scss']
})
export class ListPromotionComponent {
  data: Promotion[] = [];
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
  customerId: string | null = '';
  constructor(private promotionService: PromotionService, private modalService: NzModalService, private notification: NzNotificationService) {
    this.token = getCookie('token');
  }
  ngOnInit(): void {
    this.cols = [
      {
        id: '0',
        arr: 'Mã CT khuyến mãi',
        fieldName: 'promotionId',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '1',
        arr: 'Tên CT khuyến mãi',
        fieldName: 'name',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '2',
        arr: 'Mô tả',
        fieldName: 'description',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '3',
        arr: '% giảm giá',
        fieldName: 'discountPercent',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '4',
        arr: 'Số tiền giảm giá',
        fieldName: 'discountAmount',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '5',
        arr: 'Ngày bắt đầu',
        fieldName: 'startDate',
        width: '10em',
        type: TYPE.DATE,
      },
      {
        id: '6',
        arr: 'Ngày kết thúc',
        fieldName: 'endDate',
        width: '10em',
        type: TYPE.DATE,
      },
      {
        id: '7',
        arr: 'Trạng thái',
        fieldName: 'statusValue',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '8',
        arr: 'Thao tác',
        width: '10em',
        type: TYPE.ACTION,
        fieldName: 'action',
        listOfAction: [
          {
            actionName: 'edit',
            icon: 'edit',
            keyName: 'edit'
          },
          {
            actionName: 'updateStatus',
            icon: 'info-circle',
            keyName: 'updateStatus'
          },
        ]
      }
    ]
    this.searchSubject.pipe(
      debounceTime(300),  // Đợi 300ms sau khi người dùng dừng nhập
      distinctUntilChanged(),  // Chỉ thực hiện khi giá trị thay đổi
      switchMap(searchTerm => {
        return this.promotionService.getAllPromotions({ page: 0, size: this.pageSize, name: searchTerm });  // Gọi API với từ khóa tìm kiếm
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
      this.getAllPromotions();
    }
  }
  onCreate() {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới danh mục',
      nzContent: CreateUpdatePromotionComponent,
      nzWidth: '50%',
      nzMask: false,
      nzFooter: null
    })
    modal.afterClose.subscribe((res) => {
      if (res === true) {
        this.getAllPromotions({ page: this.page - 1, size: this.pageSize });
      }
    })
  }
  onSearch() {
    this.searchSubject.next(this.searchQuery);
  }
  getAllPromotions(payload: any = {}) {
    this.loading = true;
    this.promotionService.getAllPromotions(payload).subscribe((res: any) => {
      if (res.code === StatusResponse.OK && res.result?.content.length > 0) {
        this.data = res.result?.content;
        this.data.forEach((element: any) => {
          element.statusValue = convertValue[element.status];
        })
        this.page = res.result?.number + 1;
        this.totalElements = res.result?.totalElements;
        this.pageSize = res.result?.size;
        this.loading = false;
      }
    });
  }


  onPageChange(page: number) {
    this.page = page - 1;
    this.getAllPromotions({ page: this.page });
  }
  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.page = 0;
    this.getAllPromotions({ size: this.pageSize });
  }
  onEdit(e: any) {
    const modal = this.modalService.create({
      nzTitle: 'Sửa thông tin danh mục',
      nzContent: CreateUpdatePromotionComponent,
      nzWidth: '50%',
      nzMask: false,
      nzFooter: null
    })
    modal.componentInstance!.id = e?.promotionId;
    modal.afterClose.subscribe((res) => {
      if (res === true) {
        this.getAllPromotions({ page: this.page - 1, size: this.pageSize });
      }
    })
  }
  onUpdateStatus(e: any) {
    const modal = this.modalService.create({
      nzTitle: 'Cập nhật trạng thái',
      nzContent: UpdateStatusComponent,
      nzWidth: '20%',
      nzMaskClosable: false,
      nzFooter: null
    })
    modal.afterClose.subscribe((res: any) => {
      if (res) {
        this.getAllPromotions({ page: this.page - 1, size: this.pageSize });
      }
    })
    modal.componentInstance!.data = e;
    modal.componentInstance!.listStatus = PROMOTION_STATUS;
    modal.componentInstance!.status = e.status;
    modal.componentInstance!.typeUpdateStatus = TYPE_UPDATE_STATUS.PROMOTION;
  }
  onAction(e: any) {
    switch (e.actionName) {
      case 'edit':
        this.onEdit(e.data);
        break;
      case 'updateStatus':
        this.onUpdateStatus(e.data);
        break;
    }
  }
}
