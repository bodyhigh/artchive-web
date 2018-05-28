import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [ 
        // CoreModule,
        RouterModule.forRoot(routes)
    ],
    exports: [ RouterModule ]
})

export class AppRouterModule {}