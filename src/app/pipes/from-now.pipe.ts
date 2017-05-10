
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";
import "moment/locale/es";

@Pipe({name: 'fromNow'})
export class FromNowPipe implements PipeTransform {
    //En transform recibiremos la fecha de la publicación del post en formato timestamp
    // Y debemos calcular cuanto tiempo ha pasado respecto de la hora actual
    // Y devolverla formateada
    transform(date: number): string {
        return moment(date).fromNow();
    }
}