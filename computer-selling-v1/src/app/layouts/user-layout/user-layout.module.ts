import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from 'src/app/shared/module/ng-zorro.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { UserLayoutRoutingModule } from './user-layout-routing.modules';
import { UserLayoutComponent } from './user-layout.component';
@NgModule({
    declarations: [
        UserLayoutComponent
    ],
    imports: [
        NgZorroModule,
        UserLayoutRoutingModule,
        NzDividerModule,
        CommonModule
    ],
    providers: [],
})
export class UserLayoutModule { }
