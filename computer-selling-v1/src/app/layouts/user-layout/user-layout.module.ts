import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from 'src/app/shared/module/ng-zorro.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { UserLayoutRoutingModule } from './user-layout-routing.modules';
import { UserLayoutComponent } from './user-layout.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
@NgModule({
    declarations: [
        UserLayoutComponent
    ],
    imports: [
        NgZorroModule,
        UserLayoutRoutingModule,
        NzDividerModule,
        NzCheckboxModule,
        CommonModule,
        FormsModule
    ],
    providers: [],
})
export class UserLayoutModule { }
