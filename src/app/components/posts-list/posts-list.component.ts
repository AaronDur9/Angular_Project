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

    /*------------------------------------------------------------------------------------------------------------------|
     | ~~~ Red Path ~~~                                                                                                 |
     |------------------------------------------------------------------------------------------------------------------|
     | Maneja el evento del componente PostPreviewComponent que indica la selección del autor de un post y navega a la  |
     | dirección correspondiente. Recuerda que para hacer esto necesitas inyectar como dependencia el Router de la app. |
     | La ruta a navegar es '/posts/users', pasando como parámetro el identificador del autor.                          |
     |------------------------------------------------------------------------------------------------------------------*/


         navToAuthorDetails(author: number): void {
        this._router.navigateByUrl(`posts/users/${author}`);    
    }


     navToPostDetails(post: Post): void {
         this._router.navigateByUrl(`/posts/${post.id}`);
     }


     

}
