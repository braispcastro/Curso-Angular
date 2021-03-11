import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'mayusculas'
})
export class MayusculasPipe implements PipeTransform {

    transform(value: string, toUpper: boolean = true): string {

        return toUpper ? value.toLocaleUpperCase() : value.toLocaleLowerCase();

    }

}