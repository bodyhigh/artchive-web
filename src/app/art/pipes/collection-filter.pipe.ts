import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'collectionFilter'
})
export class CollectionFilterPipe implements PipeTransform {

    transform(collection: IArtRecord[], filterText: any): IArtRecord[] {
        console.log(filterText);
        if (!collection) return [];

        if (!filterText) return collection;

        filterText = filterText.toLowerCase();

        return collection.filter(artItem => {
            if (artItem.title.toLowerCase().includes(filterText)) {
                return true;
            }
                
            if (artItem.description.toLowerCase().includes(filterText)) {
                return true;
            }

            return false;
        })
    }

}
