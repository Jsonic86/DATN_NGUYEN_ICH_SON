import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductByCartegoryComponent } from './list-product-by-cartegory.component';

const routes: Routes = [
    {
        path: '',
        component: ListProductByCartegoryComponent,
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListProductByCartegoryRoutingModule { }
