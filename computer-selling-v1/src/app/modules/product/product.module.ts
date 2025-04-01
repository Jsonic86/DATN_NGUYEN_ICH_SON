import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './product.component';
import { NgZorroModule } from 'src/app/shared/module/ng-zorro.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { ProductRoutingModule } from './product-routing.modules';
import { CreateUpdateProductComponent } from './create-update-product/create-update-product.component';
@NgModule({
    declarations: [
        ProductComponent,
        CreateUpdateProductComponent,
    ],
    imports: [
        NgZorroModule,
        ProductRoutingModule,
        NzDividerModule,
        CommonModule,
        SharedModule,
        FormsModule
    ],
    providers: [],
})
export class ProductModule { }
