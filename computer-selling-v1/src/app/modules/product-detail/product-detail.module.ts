import { NgModule } from '@angular/core';
import { NgZorroModule } from 'src/app/shared/module/ng-zorro.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { ProductDetailRoutingModule } from './product-detail-routing.modules';
import { ProductDetailComponent } from './product-detail.component';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        ProductDetailComponent
    ],
    imports: [
        NgZorroModule,
        ProductDetailRoutingModule,
        NzDividerModule,
        CommonModule,
        FormsModule
    ],
    providers: [],
})
export class ProductDetailModule { }
