import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroModule } from './shared/module/ng-zorro.module';
import { LayoutComponent } from './layouts/layout/layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { UserLayoutModule } from './layouts/user-layout/user-layout.module';
import { SharedModule } from './shared/module/shared.module';
import { ConfirmComponent } from './shared/component/confirm/confirm.component';
import { CategoryModule } from './modules/category/category.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { ListOrderModule } from './modules/list-order/list-order.module';
import { ListProductByCartegoryComponent } from './modules/list-product-by-cartegory/list-product-by-cartegory.component';
import { ListProductByCartegoryModule } from './modules/list-product-by-cartegory/list-product-by-cartegory.module';
import { ListOrderAdminComponent } from './modules/list-order-admin/list-order-admin.component';
import { UpdateStatusComponent } from './modules/list-order-admin/update-status/update-status.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ConfirmComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminLayoutModule,
    UserLayoutModule,
    SharedModule,
    CategoryModule,
    SupplierModule,
    ListOrderModule,
    ListProductByCartegoryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
