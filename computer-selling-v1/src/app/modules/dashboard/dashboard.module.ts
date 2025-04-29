import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgZorroModule } from 'src/app/shared/module/ng-zorro.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.modules';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DashboardComponent } from './dashboard.component';
@NgModule({
    declarations: [
        DashboardComponent,
        BarChartComponent
    ],
    imports: [
        NgZorroModule,
        DashboardRoutingModule,
        NzDividerModule,
        CommonModule,
        SharedModule,
        FormsModule
    ],
    providers: [],
})
export class DashboardModule { }
