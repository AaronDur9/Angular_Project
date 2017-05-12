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
    post: Post;
    publicationDateScheduled: boolean = false;
    @Output() postSubmitted: EventEmitter<Post> = new EventEmitter();


    constructor(private _activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.nowDatetimeLocal = this._formatDateToDatetimeLocal(new Date());
        this._activatedRoute.data.forEach((data: { post: Post}) => this.post = data.post);
        console.log(this.post);
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

    submitPost(form: FormGroup): void {

        //Seguir aquí
        let post: Post = Post.fromJson(form.value);
        post.id = form.value.id ? form.value.id : '';
        post.title = form.value.title ? form.value.title : '';
        post.body = form.value.body ? form.value.body : '';
        post.intro = form.value.intro ? form.value.intro : '';
        post.categories = form.value.categories ? form.value.categories : [];
        post.media = form.value.media ? form.value.media : null;
        post.likes = 0;
        post.author = User.defaultUser();
        post.publicationDate = this._getPostPublicationDate(form.value.publicationDate);
        this.postSubmitted.emit(post);

        
    }
}
