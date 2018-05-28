import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtRouterModule } from './art-router.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ArtCollectionComponent } from './art-collection/art-collection.component';
import { ArtCreateComponent } from './art-create/art-create.component';
import { ArtEditComponent } from './art-edit/art-edit.component';
import { CollectionFilterPipe } from './pipes/collection-filter.pipe';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ArtRouterModule
    ],
    declarations: [
        ArtCollectionComponent,
        ArtCreateComponent,
        ArtEditComponent,
        CollectionFilterPipe
    ]
})

export class ArtModule { }
