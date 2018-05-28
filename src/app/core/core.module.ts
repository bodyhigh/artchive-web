import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        HeaderNavComponent, 
        HomeComponent, 
        PageNotFoundComponent
    ],
    exports: [
        HeaderNavComponent, 
        HomeComponent,
        PageNotFoundComponent
    ],
    providers: [
    ]
})
export class CoreModule { }
