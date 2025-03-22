import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from 'src/app/shared/module/ng-zorro.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../component/table/table.component';
import { UserModule } from 'src/app/modules/user/user.module';
import { FormComponent } from '../component/form/form.component';
@NgModule({
    declarations: [
        TableComponent,
        FormComponent
    ],
    imports: [
        NgZorroModule,
        NzDividerModule,
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [TableComponent, FormComponent],
    providers: [],
})
export class SharedModule { }
