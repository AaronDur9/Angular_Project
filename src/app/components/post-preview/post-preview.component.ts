import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Post } from "../../models/post";
import { User } from '../../models/user';

@Component({
    selector: "post-preview",
    templateUrl: "post-preview.component.html",
    styleUrls: ["post-preview.component.css"]
})
export class PostPreviewComponent {

    @Input() post: Post;

    
     @Output() showDetails: EventEmitter<Post> = new EventEmitter();
     @Output() showAuthor: EventEmitter<number> = new EventEmitter();

    plainTextToHtml(text: string): string {
        return `<p>${text.replace(/\n/gi, "</p><p>")}</p>`;
    }

    //Manejador del evento click en un post
    // Lanzamos un evento al padre de postPreview, el cual será la lista de posts
    showPostDetails(): void {
        this.showDetails.emit(this.post);
    }

    // Lanzamos un evento al padre de postPreview, el cual será la lista de posts
    showAuthorDetails(): void {
        this.showAuthor.emit(this.post.author.id);
    }
}
