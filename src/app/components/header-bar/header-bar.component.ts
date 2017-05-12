import { Component } from "@angular/core";

@Component({
    selector: "header-bar",
    templateUrl: "header-bar.component.html",
    styleUrls: ["header-bar.component.css"]
})
export class HeaderBarComponent { 


    constructor() {}


    //Método que recibe el string introducido para la búsqueda de post
    postSearch(postText: string) {

        console.log(postText);

    }
}
