import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from 'src/app/shared/module/ng-zorro.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { CategoryComponent } from './category.component';
import { CategoryRoutingModule } from './category-routing.modules';
import { CreateUpdateCategoryComponent } from './create-update-category/create-update-category.component';
@NgModule({
    declarations: [
        CategoryComponent,
        CreateUpdateCategoryComponent,
    ],
    imports: [
        NgZorroModule,
        CategoryRoutingModule,
        NzDividerModule,
        CommonModule,
        SharedModule,
        FormsModule
    ],
    providers: [],
})
export class CategoryModule { }
