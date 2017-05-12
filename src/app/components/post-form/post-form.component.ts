import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { Post } from "../../models/post";
import { User } from "../../models/user";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: "post-form",
    templateUrl: "post-form.component.html",
    styleUrls: ["post-form.component.css"]
})
export class PostFormComponent implements OnInit {

    nowDatetimeLocal: string;
    post: Post = null;
    publicationDateScheduled: boolean = false;
    @Output() postSubmitted: EventEmitter<Post> = new EventEmitter();
    @Output() postEdited: EventEmitter<Post> = new EventEmitter();


    constructor(private _activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.nowDatetimeLocal = this._formatDateToDatetimeLocal(new Date());
        this._activatedRoute.data.forEach((data: { post: Post}) => this.post = data.post);
    }

    private _formatDateToDatetimeLocal(date: Date) {
        return `
            ${this._fixPad(date.getFullYear(), 4)}-
            ${this._fixPad(date.getMonth() + 1, 2)}-
            ${this._fixPad(date.getDate(), 2)}T
            ${this._fixPad(date.getHours(), 2)}:
            ${this._fixPad(date.getMinutes(), 2)}`.replace(/\n/gi, "").replace(/ /gi, "");
    }

    private _fixPad(datePart: number, length: number): string {
        return `0000${datePart}`.slice(-length);
    }

    private _getPostPublicationDate(formPublicationDate: string): number {
        let publicationDate: Date;
        if (this.publicationDateScheduled) {
            publicationDate = new Date(formPublicationDate);
            if (isNaN(publicationDate.getTime())) {
                publicationDate = new Date();
            }
        }
        else {
            publicationDate = new Date();
        }
        return publicationDate.getTime();
    }

    setScheduling(schedule: boolean): void {
        this.publicationDateScheduled = schedule;
    }


    //Nos pulsarán este botón  tanto para crear como para editar un post
    //Si this.post != null significará que lo quiere editar
    submitPost(form: FormGroup): void {

        let postTemp: Post = Post.fromJson(form.value);

        //Editar post
        if(this.post) {
            postTemp.id = form.value.id ? form.value.id : this.post.id;
            postTemp.title = form.value.title ? form.value.title : this.post.title;
            postTemp.body = form.value.body ? form.value.body : this.post.body;
            postTemp.intro = form.value.intro ? form.value.intro : this.post.intro;
            postTemp.categories = form.value.categories ? form.value.categories : this.post.categories;
            postTemp.media = form.value.media ? form.value.media : this.post.media;
            postTemp.likes = this.post.likes;
            postTemp.author = this.post.author;
            postTemp.likerUsers = this.post.likerUsers;
            postTemp.publicationDate = form.value.publicationDate ? this._getPostPublicationDate(form.value.publicationDate) : this.post.publicationDate;
            this.postEdited.emit(postTemp);
        }
        else {  //Crear post    
            postTemp.id = form.value.id ? form.value.id : '';
            postTemp.title = form.value.title ? form.value.title : '';
            postTemp.body = form.value.body ? form.value.body : '';
            postTemp.intro = form.value.intro ? form.value.intro : '';
            postTemp.categories = form.value.categories ? form.value.categories : [];
            postTemp.media = form.value.media ? form.value.media : null;
            postTemp.likes = 0;
            postTemp.likerUsers = [];
            postTemp.author = User.defaultUser();
            postTemp.publicationDate = this._getPostPublicationDate(form.value.publicationDate);
            this.postSubmitted.emit(postTemp);
        }

        
    }
}
