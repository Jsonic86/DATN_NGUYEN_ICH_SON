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
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { SetPromotionComponent } from './set-promotion/set-promotion.component';
import { CategoryService } from 'src/app/services/category.service';

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
  loading: boolean = false;
  totalElements: number = 0;
  page: number = 0;
  pageSize: number = 10;
  searchQuery: string = '';
  searchSubject: Subject<string> = new Subject<string>();

  // New properties for category filtering
  categories: any[] = [];
  selectedCategory: any = null;

  constructor(
    private productSerivce: ProductService,
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private categoryService: CategoryService
  ) {
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
        arr: 'Chương trình khuyến mãi',
        fieldName: 'promotionName',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '7',
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
            actionName: 'setPromotion',
            icon: 'info-circle',
            keyName: 'setPromotion'
          },
          {
            actionName: 'delete',
            icon: 'delete',
            keyName: 'delete'
          }
        ]
      },
    ]

    // Load categories for dropdown
    this.getCategories(); this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchTerm => {
        return this.productSerivce.getAllProducts({
          page: 0,
          size: this.pageSize,
          name: searchTerm,
          categoryId: this.selectedCategory || 0 // Include category filter
        });
      })
    ).subscribe(res => {
      if (res.code === StatusResponse.OK && res.result?.content.length > 0) {
        this.data = res.result?.content;
        this.page = res.result?.number + 1;
        this.totalElements = res.result?.totalElements;
        this.pageSize = res.result?.size;
        this.loading = false;
      } else {
        this.data = [];
        this.totalElements = 0;
        this.loading = false;
      }
    });
  }

  // Get categories for dropdown
  getCategories() {
    this.categoryService.getAllCategories().subscribe((res: any) => {
      if (res.code === StatusResponse.OK) {
        // Handle paginated response with content array
        if (res.result && res.result.content && Array.isArray(res.result.content)) {
          this.categories = res.result.content.map((category: any) => ({
            id: category.categoryId,
            name: category.categoryName
          }));
        } else if (Array.isArray(res.result)) {
          // Fallback for non-paginated response
          this.categories = res.result.map((category: any) => ({
            id: category.categoryId || category.id,
            name: category.categoryName || category.name
          }));
        } else {
          this.categories = [];
          console.error('Categories response format is unexpected:', res.result);
        }
      } else {
        this.categories = [];
      }
    });
  }
  // Handle category change event
  onCategoryChange() {
    this.page = 0;
    this.getAllProducts({
      page: 0,
      size: this.pageSize,
      name: this.searchQuery,
      categoryId: this.selectedCategory || 0
    });
  }

  ngAfterViewInit() {
    if (this.token) {
      this.getAllProducts();
    }
  }

  getAllProducts(payload: any = {}) {
    this.loading = true;
    this.productSerivce.getAllProductsByCategory(payload).subscribe((res: any) => {
      if (res.code === StatusResponse.OK && res.result?.content.length > 0) {
        this.data = res.result?.content;
        this.page = res.result?.number + 1;
        this.totalElements = res.result?.totalElements;
        this.pageSize = res.result?.size;
        this.loading = false;
      } else {
        this.data = [];
        this.totalElements = 0;
        this.loading = false;
      }
    });
  }

  onSearch() {
    this.searchSubject.next(this.searchQuery);
  }

  onEdit(e: ProductItemResponse) {
    const modal = this.modalService.create({
      nzTitle: 'Sửa thông tin sản phẩm',
      nzContent: CreateUpdateProductComponent,
      nzWidth: '50%',
      nzMask: false,
      nzFooter: null
    })
    modal.componentInstance!.id = e?.productId;
    modal.afterClose.subscribe((res) => {
      if (res === true) {
        this.getAllProducts({ page: this.page - 1, size: this.pageSize });
      }
    })
  }
  onCreate() {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới sản phẩm',
      nzContent: CreateUpdateProductComponent,
      nzWidth: '50%',
      nzMask: false,
      nzFooter: null
    })
    modal.afterClose.subscribe((res) => {
      if (res === true) {
        this.getAllProducts({ page: this.page - 1, size: this.pageSize });
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
        this.productSerivce.deleteById(e.productId).subscribe((response: any) => {
          if (response.code === StatusResponse.OK) {
            this.notification.success('Thông báo', 'Xóa thành công');
            this.getAllProducts({ page: this.page - 1, size: this.pageSize });
          } else {
            this.notification.error('Error', response.message);
          }
        })
      }
    })
  }
  onSetPromotion(e: any) {
    const modal = this.modalService.create({
      nzTitle: 'Chương trình khuyến mãi',
      nzContent: SetPromotionComponent,
      nzWidth: '20%',
      nzMaskClosable: false,
      nzFooter: null
    })
    modal.afterClose.subscribe((res: any) => {
      if (res) {
        this.getAllProducts({ page: this.page - 1, size: this.pageSize });
      }
    })
    modal.componentInstance!.data = e;
  }
  onAction(e: any) {
    switch (e.actionName) {
      case 'edit':
        this.onEdit(e.data);
        break;
      case 'setPromotion':
        this.onSetPromotion(e.data);
        break;
      case 'delete':
        this.onDelete(e.data);
        break;
    }
  } onPageChange(page: number) {
    this.page = page - 1;
    this.getAllProducts({
      page: this.page,
      size: this.pageSize,
      name: this.searchQuery,
      categoryId: this.selectedCategory || 0
    });
  }
  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.page = 0;
    this.getAllProducts({
      size: this.pageSize,
      name: this.searchQuery,
      categoryId: this.selectedCategory || 0
    });
  }
}
