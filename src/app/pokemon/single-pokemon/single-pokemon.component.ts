import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../pokemon.component';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface PokemonSpecies {
  id: number,
  name: string,
  order: number,
  evolution_chain: {
    url: string,
  },
  flavor_text_entries: {
    flavor_text: string,
    language: {
      name: string,
      url: string,
    }
  }[],
  genera: {
    genus: string,
    language: {
      name: string,
      url: string,
    }
  }[],
  varieties: {
    is_default: boolean,
    pokemon: {
    }
  }[],
}

export interface EvolutionChain {
  id: number,
  chain: ChainLink,
  baby_trigger_item: any, //TODO: add item interface
}

export interface ChainLink {
  evolution_details: EvolutionDetail,
  evolves_to: ChainLink[],
  is_baby: boolean,
  species: {
    name: string,
    url: string,
  }
}

export interface EvolutionDetail {
  item: any, //TODO: add item interface
  gender: number,
  trigger: EvolutionTrigger,
}

export interface EvolutionTrigger {
  name: string,
  id: number,
  names: {
    name: string,
    language: any
  }[],
}

@Component({
  selector: 'app-single-pokemon',
  templateUrl: './single-pokemon.component.html',
  styleUrls: ['./single-pokemon.component.css']
})
export class SinglePokemonComponent implements OnInit {

  private pokemonObj!: Pokemon;
  private pokemonSpeciesObj!: PokemonSpecies;
  private evolutionChain!: EvolutionChain;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) { }

  async ngOnInit() {
    this.pokemonObj = history.state.pokemon; // this is the pokemon object passed from the previous page
    let speciesObjString = "https://pokeapi.co/api/v2/pokemon-species/"+this.pokemonObj.order.toString();

    this.pokemonSpeciesObj = await lastValueFrom(this.httpClient.get<PokemonSpecies>(speciesObjString));
    this.evolutionChain = await lastValueFrom(this.httpClient.get<EvolutionChain>(this.pokemonSpeciesObj.evolution_chain.url.toString()));


    //WHAT THE FUCK IS THIS
    this.evolutionChain.chain.evolves_to.forEach((evolution) => {
      if (evolution.species.name == this.pokemonObj.name) {
        this.evolutionChain.chain = evolution;
      } else {
        evolution.evolves_to.forEach((evolution2) => {
          if (evolution2.species.name == this.pokemonObj.name) {
            this.evolutionChain.chain = evolution2;
          } else {
            evolution2.evolves_to.forEach((evolution3) => {
              if (evolution3.species.name == this.pokemonObj.name) {
                this.evolutionChain.chain = evolution3;
              } else {
                evolution3.evolves_to.forEach((evolution4) => {
                  this.evolutionChain.chain = evolution4;
                });
              }
            });
          }
        });
      }
    });

    console.log(this.pokemonSpeciesObj); 
    console.log(this.pokemonObj.order.toString());
  }

  public goToEvolution() {
    return;
  }

  public get pokemon(): Pokemon {
    return this.pokemonObj;
  }

  public get evolutionInfo(): string|null {

    let evolutionName = this.evolutionChain.chain.evolves_to[0].species.name;

    if (evolutionName == "" || evolutionName == undefined || evolutionName == null) { 
      return null;
    } 
    return evolutionName;
  }

  //Return the first type (if dual type)
  public get mainType(): string {
    return this.pokemonObj.types[0].type.name;
  }

}
