import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { environment } from '../../../environments/environment';

import { ArtService, LogService } from '../../services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-art-collection',
  templateUrl: './art-collection.component.html',
  styleUrls: ['./art-collection.component.css']
})
export class ArtCollectionComponent implements OnInit {
    artCollection: any[] = [];

    constructor(private artService: ArtService, 
        private logService: LogService,
        private router: Router) { }

    ngOnInit() {
        this.artService.getAll()
            .subscribe(
                data => {
                    this.artCollection = data;
                },
                err => this.logService.log(err));
    }

    imgPrimary(artItem) {
        if (Array.isArray(artItem.imageUrls) && artItem.imageUrls.length > 0) {            
            var primaryImg = artItem.imageUrls.find(img => img.isPrimary === true);

            if (primaryImg) {
                return primaryImg.url;
            }
        }

        return this.artService.getPlaceholderImage().thumbnailUrl;
    }

    onArtItemClick(item) {
        //art-collection/edit
        this.router.navigate(['art-collection/edit/' + item._id])
        
    }
}
