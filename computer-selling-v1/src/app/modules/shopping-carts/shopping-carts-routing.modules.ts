import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartsComponent } from './shopping-carts.component';

const routes: Routes = [
    {
        path: '',
        component: ShoppingCartsComponent,
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShoppingCartsRoutingModule { }
