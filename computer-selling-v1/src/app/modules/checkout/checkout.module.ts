import { NgModule } from '@angular/core';
import { NgZorroModule } from 'src/app/shared/module/ng-zorro.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from './checkout-routing.modules';
import { CheckoutComponent } from './checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddAddressShipmentComponent } from './add-address-shipment/add-address-shipment.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
@NgModule({
    declarations: [
        CheckoutComponent,
        AddAddressShipmentComponent
    ],
    imports: [
        NgZorroModule,
        CheckoutRoutingModule,
        NzDividerModule,
        CommonModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [],
})
export class CheckoutModule { }
