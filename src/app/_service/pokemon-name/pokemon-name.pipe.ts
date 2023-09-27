import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonName'
})
export class PokemonNamePipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {

    let returnString: string = value;

    //
    if(value.includes("-f") || value.includes("-F")) {
      returnString = value.split("-")[0] + " ♀";
    } else if (value.includes("-m") || value.includes("-M")) {
      returnString = value.split("-")[0] + " ♂";
    }

    return returnString.split("")[0].toUpperCase() + returnString.slice(1);
  }

}
