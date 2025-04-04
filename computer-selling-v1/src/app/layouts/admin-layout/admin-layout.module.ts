import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from 'src/app/shared/module/ng-zorro.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminLayoutRoutingModule } from './admin-layout-routing.modules';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { TabPanelComponent } from './tab-panel/tab-panel.component';
import { MyinfoComponent } from './myinfo/myinfo.component';
@NgModule({
    declarations: [
        AdminLayoutComponent,
        TabGroupComponent,
        TabPanelComponent,
        MyinfoComponent,
    ],
    imports: [
        NzDropDownModule,
        NgZorroModule,
        AdminLayoutRoutingModule,
        NzDividerModule,
        CommonModule
    ],
    providers: [],
})
export class AdminLayoutModule { }
