import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Post } from "../../models/post";
import { Category } from '../../models/category';
import { User } from '../../models/user';
import { PostService } from '../../services/post.service';

@Component({
    templateUrl: "post-details.component.html",
    styleUrls: ["post-details.component.css"]
})
export class PostDetailsComponent implements OnInit {

    post: Post;
    user: User;
    @Input() login: boolean;
    @Input() liked: boolean;

    constructor(private _activatedRoute: ActivatedRoute,
                private _router: Router,
                private _postService: PostService) { }

    ngOnInit(): void {
        this._activatedRoute.data.forEach((data: { post: Post}) => this.post = data.post);
        window.scrollTo(0, 0);
        this.user = User.defaultUser();
        this.isLogin();
        this.isLiked();
        
    }

    // Método que se encarga de cambiar el color del botón like, cuando este usuario ya ha dado like a este post.
    isLiked(): void {
         let index = this.post.likerUsers.findIndex((userId: number) => {
            return +this.user.id === +userId;
        });
        
        if(index === -1)
            this.liked = false;
        else
            this.liked = true;
    }

    isLogin(): void {
        if(this.post.author.id === this.user.id)
            this.login = true;
        else
            this.login = false;

    }


    plainTextToHtml(text: string): string {
        return `<p>${text.replace(/\n/gi, "</p><p>")}</p>`;
    }


    // Este método se encarga de que un usuario solo pueda pulsar una vez el botón de like
    // Y de almacenarlos en la bd
    /*BD:
        1- Cada post tiene un contador de likes -> Sumamos uno
        2- Cada post tendrá un nuevo array de personas que han dado like para impedir que una persona de like dos veces al mismo post

        Problema: Tenemos que preocuparnos de poner en azul el botón de me gusta cuando el usuario ya haya pulsado
    */
    addLike():void {
        
        if(this.liked) { //Si ya había pulsado el botón de like
            this.post.likes--;
            
            //Índice de la posición del id de este usuario en la lista de usuarios que han pulsado like
            let index = this.post.likerUsers.findIndex((userId: number) => {
                return +userId === +this.user.id;
            });
            //Eliminamos el íd del usuario de los likes
            this.post.likerUsers.splice(index, 1);
            }
        else { //El usuario no había pulsado like aún.
            
            this.post.likes++;
            //Añadimos el id del usuario a la lista de usuarios que han dado like a ese post.
            this.post.likerUsers.push(this.user.id);
        }

        this.liked = !this.liked;
        //Llamamos al servicio para que actualice el post
        this._postService.editPost(this.post).subscribe((post:Post) => console.log(post));
        
    }

    navToAuthorDetails(): void {
        this._router.navigateByUrl(`posts/users/${this.post.author.id}`);    
    }

     navToCategories(category: Category):void {
         this._router.navigateByUrl(`posts/categories/${category.id}`);
     }
}
