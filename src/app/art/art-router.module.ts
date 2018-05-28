import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { ArtCollectionComponent } from './art-collection/art-collection.component';
import { ArtCreateComponent } from './art-create/art-create.component';
import { ArtEditComponent } from './art-edit/art-edit.component';

const routes: Routes = [
    { path: 'art-collection', component: ArtCollectionComponent, canActivate: [AuthGuard] },
    { path: 'art-collection/create', component: ArtCreateComponent, canActivate: [AuthGuard] },
    { path: 'art-collection/edit/:id', component: ArtEditComponent, canActivate: [AuthGuard] }
    // { path: 'edit', component: ArtCreateComponent, canActivate: [AuthGuard] },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class ArtRouterModule {}