import { NgModule } from '@angular/core';
import { NgZorroModule } from 'src/app/shared/module/ng-zorro.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { ShoppingCartsRoutingModule } from './shopping-carts-routing.modules';
import { ShoppingCartsComponent } from './shopping-carts.component';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        ShoppingCartsComponent
    ],
    imports: [
        NgZorroModule,
        ShoppingCartsRoutingModule,
        NzDividerModule,
        CommonModule,
        FormsModule
    ],
    providers: [],
})
export class ShoppingCartsModule { }
