import { Inject, Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { BackendUri } from "./settings.service";
import { Post } from "../models/post";
import { Category } from '../models/category';

@Injectable()
export class PostService {

    constructor(
        private _http: Http,
        @Inject(BackendUri) private _backendUri: any) { }

    getPosts(): Observable<Post[]> {

         // Current date in timestamp format
         const date: number = +new Date();
       
       
       
        return this._http
                   .get(`${this._backendUri}/posts?publicationDate_lte=${date}&_sort=publicationDate&_order=DESC`)
                   .map((response: Response) => Post.fromJsonToList(response.json()));
    }


    // Hacer petición al servidor para que solo devuelva los posts de los usuarios con un cierto id
    getUserPosts(id: number): Observable<Post[]> {

        
          // Current date in timestamp format
         const date: number = +new Date();

        return this._http
                   .get(`${this._backendUri}/posts?author.id=${id}&publicationDate_lte=${date}&_sort=publicationDate&_order=DESC`)
                   .map((response: Response) => Post.fromJsonToList(response.json()));
    }

    getCategoryPosts(id: number): Observable<Post[]> {

         // Current date in timestamp format
         const date: number = +new Date();

        return this._http
                   .get(`${this._backendUri}/posts?publicationDate_lte=${date}&_sort=publicationDate&_order=DESC`)
                   .map((response: Response) =>  {
                       //debugger;
                       // En post tenemos todos los post ordenados, pero aún tenemos que filtrarlos por categoría
                       const posts: Array<Post> = Post.fromJsonToList(response.json());
                       
                       // Filtramos los posts, eliminando aquellos que no tengan una categoría igual a la seleccionada. 
                      const a: Array<Post> =  posts.filter(post => {
                           //Comprobamos si alguna categoría del post actual tiene la categoría seleccionada.
                           const res = post.categories.findIndex((category) => {
                               return category.id === +id;
                           });
                           if(res !== -1){
                                return true;
                            }
                            else {
                                return false;
                            }
                       });
                       return a;
                       
                });
    }


    getPostDetails(id: number): Observable<Post> {
        return this._http
                   .get(`${this._backendUri}/posts/${id}`)
                   .map((response: Response) => Post.fromJson(response.json()));
    }

    createPost(post: Post): Observable<Post> {

        return this._http
        .post(`${this._backendUri}/posts`, post)
        .map(res => Post.fromJson(res.json()));
    }

    // Editamos un post
    editPost(post: Post): Observable<Post> {

        return this._http
        .put(`${this._backendUri}/posts/${post.id}`, post)
        .map(res => Post.fromJson(res.json()));
    }



}
