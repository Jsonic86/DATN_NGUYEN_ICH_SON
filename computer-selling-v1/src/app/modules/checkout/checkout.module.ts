import { NgModule } from '@angular/core';
import { NgZorroModule } from 'src/app/shared/module/ng-zorro.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from './checkout-routing.modules';
import { CheckoutComponent } from './checkout.component';
@NgModule({
    declarations: [
        CheckoutComponent
    ],
    imports: [
        NgZorroModule,
        CheckoutRoutingModule,
        NzDividerModule,
        CommonModule
    ],
    providers: [],
})
export class CheckoutModule { }
