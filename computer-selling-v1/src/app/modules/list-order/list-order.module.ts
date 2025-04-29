import { NgModule } from '@angular/core';
import { NgZorroModule } from 'src/app/shared/module/ng-zorro.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { ListOrderRoutingModule } from './list-order-routing.modules';
import { ListOrderComponent } from './list-order.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { ListOrderDetailComponent } from './list-order-detail/list-order-detail.component';
import { PaymentComponent } from './payment/payment.component';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        ListOrderComponent,
        ListOrderDetailComponent,
        PaymentComponent
    ],
    imports: [
        NgZorroModule,
        ListOrderRoutingModule,
        NzDividerModule,
        CommonModule,
        FormsModule,
        SharedModule
    ],
    providers: [],
})
export class ListOrderModule { }
