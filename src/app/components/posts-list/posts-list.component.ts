import { Component, Input } from "@angular/core";

import { Post } from "../../models/post";
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
    selector: "posts-list",
    templateUrl: "posts-list.component.html"
})
export class PostsListComponent {

    constructor(private _router: Router) {}



    @Input() posts: Post[];

         navToAuthorDetails(author: number): void {
        this._router.navigateByUrl(`posts/users/${author}`);    
    }


     navToPostDetails(post: Post): void {
         this._router.navigateByUrl(`/posts/${post.id}`);
     }


     

}
