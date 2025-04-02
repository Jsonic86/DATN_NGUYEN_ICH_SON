import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroModule } from './shared/module/ng-zorro.module';
import { LayoutComponent } from './layouts/layout/layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './modules/user/user.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { UserLayoutModule } from './layouts/user-layout/user-layout.module';
import { TableComponent } from './shared/component/table/table.component';
import { SharedModule } from './shared/module/shared.module';
import { ConfirmComponent } from './shared/component/confirm/confirm.component';
import { FormComponent } from './shared/component/form/form.component';
import { CategoryComponent } from './modules/category/category.component';
import { CategoryModule } from './modules/category/category.module';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ConfirmComponent,

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
    CategoryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
