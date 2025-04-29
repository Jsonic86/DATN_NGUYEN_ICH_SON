import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from 'src/app/shared/module/ng-zorro.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { ListPromotionRoutingModule } from './list-promotion-routing.modules';
import { ListPromotionComponent } from './list-promotion.component';
import { CreateUpdatePromotionComponent } from './create-update-promotion/create-update-promotion.component';
@NgModule({
    declarations: [
        ListPromotionComponent,
        CreateUpdatePromotionComponent
    ],
    imports: [
        NgZorroModule,
        ListPromotionRoutingModule,
        NzDividerModule,
        CommonModule,
        SharedModule,
        FormsModule
    ],
    providers: [],
})
export class ListPromotionModule { }
