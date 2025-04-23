import { NgModule } from '@angular/core';
import { NgZorroModule } from 'src/app/shared/module/ng-zorro.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { ListProductByCartegoryComponent } from './list-product-by-cartegory.component';
import { ListProductByCartegoryRoutingModule } from './list-product-by-cartegory-routing.modules';
@NgModule({
    declarations: [
        ListProductByCartegoryComponent
    ],
    imports: [
        NgZorroModule,
        ListProductByCartegoryRoutingModule,
        NzDividerModule,
        CommonModule,
        SharedModule
    ],
    providers: [],
})
export class ListProductByCartegoryModule { }
