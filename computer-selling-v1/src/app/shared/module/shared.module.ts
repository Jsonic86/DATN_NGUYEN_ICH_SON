import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from 'src/app/shared/module/ng-zorro.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../component/table/table.component';
import { UserModule } from 'src/app/modules/user/user.module';
import { FormComponent } from '../component/form/form.component';
import { CartProductComponent } from '../component/cart-product/cart-product.component';
import { RouterModule } from '@angular/router';
@NgModule({
    declarations: [
        TableComponent,
        FormComponent,
        CartProductComponent
    ],
    imports: [
        NgZorroModule,
        NzDividerModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [TableComponent, FormComponent, CartProductComponent],
    providers: [],
})
export class SharedModule { }
