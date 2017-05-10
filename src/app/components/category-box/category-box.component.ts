import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Category } from '../../models/category';

@Component({
    selector: "category-box",
    templateUrl: "category-box.component.html",
    styleUrls: ["category-box.component.css"]
})
export class CategoryBoxComponent {

    @Input() categories: Category[];
    
    @Output()  filterByCategory: EventEmitter<Category> = new EventEmitter();


     // Notificamos a nuestro padre (Post-details) que han pulsado sobre una categoría.
     notifyCategory(category: Category): void {
         this.filterByCategory.emit(category);
     }


}
