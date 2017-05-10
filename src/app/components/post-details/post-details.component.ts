import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

import { Post } from "../../models/post";
import { Category } from '../../models/category';

@Component({
    templateUrl: "post-details.component.html",
    styleUrls: ["post-details.component.css"]
})
export class PostDetailsComponent implements OnInit {

    post: Post;

    constructor(private _activatedRoute: ActivatedRoute,
                private _router: Router) { }

    ngOnInit(): void {
        this._activatedRoute.data.forEach((data: { post: Post}) => this.post = data.post);
        window.scrollTo(0, 0);
    }

    plainTextToHtml(text: string): string {
        return `<p>${text.replace(/\n/gi, "</p><p>")}</p>`;
    }



    navToAuthorDetails(): void {
        this._router.navigateByUrl(`posts/users/${this.post.author.id}`);    
    }

     navToCategories(category: Category):void {
         this._router.navigateByUrl(`posts/categories/${category.id}`);
     }
}
