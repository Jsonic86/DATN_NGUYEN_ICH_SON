import { NgModule } from '@angular/core';

import { NgZorroModule } from 'src/app/shared/module/ng-zorro.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminLayoutRoutingModule } from './admin-layout-routing.modules';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { TabPanelComponent } from './tab-panel/tab-panel.component';
import { MyinfoComponent } from './myinfo/myinfo.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { ListOrderAdminComponent } from 'src/app/modules/list-order-admin/list-order-admin.component';
import { UpdateStatusComponent } from 'src/app/modules/list-order-admin/update-status/update-status.component';
@NgModule({
    declarations: [
        AdminLayoutComponent,
        TabGroupComponent,
        TabPanelComponent,
        MyinfoComponent,
        ListOrderAdminComponent,
        UpdateStatusComponent
    ],
    imports: [
        ReactiveFormsModule,
        NzDropDownModule,
        NgZorroModule,
        AdminLayoutRoutingModule,
        NzDividerModule,
        CommonModule,
        NzMenuModule,
        SharedModule,
        FormsModule
    ],
    providers: [],
})
export class AdminLayoutModule { }
