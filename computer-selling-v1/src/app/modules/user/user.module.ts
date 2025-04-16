import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { NgZorroModule } from 'src/app/shared/module/ng-zorro.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { CreateUpdateUserComponent } from './create-update-user/create-update-user.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
@NgModule({
    declarations: [
        UserComponent,
        CreateUpdateUserComponent,
        RegisterEmployeeComponent
    ],
    imports: [
        NgZorroModule,
        UserRoutingModule,
        NzDividerModule,
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
    ],
    providers: [],
})
export class UserModule { }
