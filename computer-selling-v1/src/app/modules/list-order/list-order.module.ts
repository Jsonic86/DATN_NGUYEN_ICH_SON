import { NgModule } from '@angular/core';
import { NgZorroModule } from 'src/app/shared/module/ng-zorro.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { ListOrderRoutingModule } from './list-order-routing.modules';
import { ListOrderComponent } from './list-order.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { ListOrderDetailComponent } from './list-order-detail/list-order-detail.component';
@NgModule({
    declarations: [
        ListOrderComponent,
        ListOrderDetailComponent
    ],
    imports: [
        NgZorroModule,
        ListOrderRoutingModule,
        NzDividerModule,
        CommonModule,
        SharedModule
    ],
    providers: [],
})
export class ListOrderModule { }
