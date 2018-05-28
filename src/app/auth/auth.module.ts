import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthRouterModule } from './auth-router.module';

import { AuthService } from '../services/auth.service';
import { LogService } from '../services/log.service';

import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        AuthRouterModule
    ],
    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent,
        
    ],
    providers: [
        AuthService,
        LogService
    ]
})
export class AuthModule { }
