import { NgModule } from '@angular/core';
import { NgZorroModule } from 'src/app/shared/module/ng-zorro.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.modules';
@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        NgZorroModule,
        HomeRoutingModule,
        NzDividerModule,
        CommonModule
    ],
    providers: [],
})
export class HomeModule { }
