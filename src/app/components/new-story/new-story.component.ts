import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs/Subscription";

import { Post } from "../../models/post";
import { PostService } from "../../services/post.service";
import { PostDetailsResolve } from '../../services/post-details-resolve.service';

@Component({
    templateUrl: "new-story.component.html",
    styleUrls: ["new-story.component.css"]
})
export class NewStoryComponent implements OnDestroy {
      


    private _postSubscription: Subscription;

    constructor(
        private _postService: PostService,
        private _router: Router
        ) { }

    ngOnDestroy(): void {
        this._unsubscribePostCreation();
    }

    
    // Cuando pulsan el botón para crear un post se llama a este método
    createPost(post: Post): void {
        // Se desuscribe de los eventos para crear un post
        this._unsubscribePostCreation();
        this._postSubscription = this._postService.createPost(post).subscribe(() => this._router.navigate(["/"]));
    }


    // Cuando pulsen el botón para editar un post se llamará a este
    editPost(post: Post): void {
        // Tendremos que desuscribirnos de los eventos para editar un post
        // Como utilizamos la misma variable para la subscripción utilizamos el mismo método para desuscribirnos
        this._unsubscribePostCreation();
        this._postSubscription = this._postService.editPost(post).subscribe(() => this._router.navigate(["/"]));
    }



    private _unsubscribePostCreation(): void {
        if (this._postSubscription) {
            this._postSubscription.unsubscribe();
        }
    }


}
