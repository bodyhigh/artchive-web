import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { ArtModule } from './art/art.module';
import { AuthModule } from './auth/auth.module';
import { AppRouterModule } from './app-router.module';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

// Services
import { ArtService, AuthService, LogService, ResponseUtilService } from './services';
import { AuthGuard } from './guards';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

// JWT Config
const jwtConfig = {
    config: {
        tokenGetter: () => localStorage.getItem(environment.jwtTokenKey),
        whitelistedDomains: environment.jwtWhitelistedDomains,
        blacklistedRoutes: environment.jwtBlacklistedRoutes
    }
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        JwtModule.forRoot(jwtConfig),
        AuthModule,
        ArtModule,
        CoreModule,
        AppRouterModule
    ],
    providers: [
        ArtService,
        AuthGuard,
        AuthService,
        LogService,
        ResponseUtilService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
