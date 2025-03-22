import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.modules';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from '../shared/module/ng-zorro.module';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        AuthRoutingModule,
        ReactiveFormsModule,
        NgZorroModule
    ],
    providers: [],
})
export class AuthModule { }
