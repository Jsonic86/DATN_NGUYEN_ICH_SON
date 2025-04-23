import { NgModule } from '@angular/core';
import { NgZorroModule } from 'src/app/shared/module/ng-zorro.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.modules';
import { SharedModule } from 'src/app/shared/module/shared.module';
@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        NgZorroModule,
        HomeRoutingModule,
        NzDividerModule,
        CommonModule,
        SharedModule
    ],
    providers: [],
})
export class HomeModule { }
