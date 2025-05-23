import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TITLE } from 'src/app/core/const/constant';
import { TabItem } from 'src/app/core/const/interface';
import { deleteCookie } from 'src/app/core/utils';
import { UserComponent } from 'src/app/modules/user/user.component';
import { AuthService } from 'src/app/services/auth.service';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { ProductComponent } from 'src/app/modules/product/product.component';
import { CategoryComponent } from 'src/app/modules/category/category.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MyinfoComponent } from './myinfo/myinfo.component';
import { SupplierComponent } from 'src/app/modules/supplier/supplier.component';
import { ListOrderAdminComponent } from 'src/app/modules/list-order-admin/list-order-admin.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { ListPromotionComponent } from 'src/app/modules/list-promotion/list-promotion.component';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  currentIndex: number = 1;
  selectedValue: string = '1';
  isCollapsed = false;
  tabPanelList: TabItem[] = [
    {
      title: 'Dashboard',
      panelBody: DashboardComponent,
      isAdded: false
    },
    {
      title: 'Quản lý tài khoản',
      panelBody: UserComponent,
      isAdded: false
    },
    {
      title: 'Quản lý sản phẩm',
      panelBody: ProductComponent,
      isAdded: false
    }
    , {
      title: 'Quản lý danh mục',
      panelBody: CategoryComponent,
      isAdded: false
    }
    , {
      title: 'Quản lý nhà cung cấp',
      panelBody: SupplierComponent,
      isAdded: false
    }
    , {
      title: 'Quản lý đơn hàng',
      panelBody: ListOrderAdminComponent,
      isAdded: false
    },
    {
      title: 'Quản lý khuyến mãi',
      panelBody: ListPromotionComponent,
      isAdded: false
    }
  ];
  TITLE = TITLE;
  @ViewChild(TabGroupComponent) tabGroupComponent!: TabGroupComponent;
  constructor(public authService: AuthService, private router: Router, private modalService: NzModalService) { }

  ngOnInit(): void {
    this.onSelect(TITLE.USER);
  }
  onLogOut() {
    deleteCookie('token');
    deleteCookie('roles');
    this.router.navigate(['/user/home']);
  }
  onSelect(title: string) {
    this.tabPanelList.forEach((item, index) => {
      if (item.title === title) {
        this.currentIndex = index;
        item.isAdded = true;
        this.tabGroupComponent.setActiveIndex(index);
      }
    });
  }
  getProfile() {
    const modal = this.modalService.create({
      nzTitle: "Thông tin cá nhân",
      nzContent: MyinfoComponent,
      nzWidth: "50%",
      nzMaskClosable: false,
      nzFooter: null
    })
  }
}
