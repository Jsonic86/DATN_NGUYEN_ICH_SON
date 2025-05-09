import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './user-layout.component';
import { ListOrderDetailComponent } from 'src/app/modules/list-order/list-order-detail/list-order-detail.component';

const routes: Routes = [
    {
        path: '',
        component: UserLayoutComponent,
        children: [
            { path: 'home', loadChildren: () => import('./../../modules/home/home.module').then(m => m.HomeModule) },
            { path: 'product-detail/:id', loadChildren: () => import('./../../modules/product-detail/product-detail.module').then(m => m.ProductDetailModule) },
            { path: 'shopping-carts', loadChildren: () => import('./../../modules/shopping-carts/shopping-carts.module').then(m => m.ShoppingCartsModule) },
            { path: 'checkout', loadChildren: () => import('./../../modules/checkout/checkout.module').then(m => m.CheckoutModule) },
            { path: 'list-order', loadChildren: () => import('./../../modules/list-order/list-order.module').then(m => m.ListOrderModule) },
            { path: 'list-product-by-category/:id', loadChildren: () => import('./../../modules/list-product-by-cartegory/list-product-by-cartegory.module').then(m => m.ListProductByCartegoryModule) },
            { path: 'order-detail/:id', component: ListOrderDetailComponent }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserLayoutRoutingModule { }
