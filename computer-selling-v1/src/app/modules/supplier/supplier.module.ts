import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from 'src/app/shared/module/ng-zorro.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { SupplierComponent } from './supplier.component';
import { CreateUpdateSupplierComponent } from './create-update-supplier/create-update-supplier.component';
import { SupplierRoutingModule } from './supplier-routing.modules';
@NgModule({
    declarations: [
        SupplierComponent,
        CreateUpdateSupplierComponent,
    ],
    imports: [
        NgZorroModule,
        SupplierRoutingModule,
        NzDividerModule,
        CommonModule,
        SharedModule,
        FormsModule
    ],
    providers: [],
})
export class SupplierModule { }
