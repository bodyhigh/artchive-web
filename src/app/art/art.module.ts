import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtRouterModule } from './art-router.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ArtCollectionComponent } from './art-collection/art-collection.component';
import { ArtCreateComponent } from './art-create/art-create.component';
import { ArtEditComponent } from './art-edit/art-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ArtRouterModule
    ],
    declarations: [
        ArtCollectionComponent,
        ArtCreateComponent,
        ArtEditComponent
    ]
})

export class ArtModule { }
