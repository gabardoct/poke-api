import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationStart, Router, UrlSegment } from '@angular/router';
import { Pokemon } from '../pokemon.component';
import { first, firstValueFrom, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Navigation } from '@angular/router';


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

  private pokemonObj: Pokemon | null = null;
  private pokemonSpeciesObj!: PokemonSpecies;
  private evolutionChain!: EvolutionChain;

  constructor(
    private route: ActivatedRoute,  
    private router: Router, 
    private httpClient: HttpClient) { }

  async ngOnInit() {
    
    this.route.paramMap.subscribe(params => {
      const pokemon = history.state && history.state.pokemon;
      if (pokemon) {
        this.pokemonObj = pokemon;
        console.log(this.pokemonObj);
        this.refresh();
      }
    });

    this.refresh();

  }

  public async refresh() {
    if (!this.pokemonObj) {
      this.pokemonObj = await lastValueFrom(this.httpClient.get<Pokemon>("https://pokeapi.co/api/v2/pokemon/" + this.route.snapshot.params['id']));
    } 

    let speciesObjString = this.pokemonObj.species.url.toString();

    this.pokemonSpeciesObj = await lastValueFrom(this.httpClient.get<PokemonSpecies>(speciesObjString));
    this.evolutionChain = await lastValueFrom(this.httpClient.get<EvolutionChain>(this.pokemonSpeciesObj.evolution_chain.url.toString()));


    //TODO: Fix this stupid shit
    this.evolutionChain.chain.evolves_to.forEach((evolution) => {
      if (evolution.species.name == this.pokemonObj!.name) {
        this.evolutionChain.chain = evolution;
      } else {
        evolution.evolves_to.forEach((evolution2) => {
          if (evolution2.species.name == this.pokemonObj!.name) {
            this.evolutionChain.chain = evolution2;
          } else {
            evolution2.evolves_to.forEach((evolution3) => {
              if (evolution3.species.name == this.pokemonObj!.name) {
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
    
  }

  public async goToEvolution() {
    let pokemon: Pokemon = await lastValueFrom(this.httpClient.get<Pokemon>("https://pokeapi.co/api/v2/pokemon/" + this.evolutionInfo));
    this.router.navigate(['/single-pokemon', pokemon.id], { state: { pokemon } });
  }

  public get pokemon(): Pokemon {
    return this.pokemonObj!;
  }

  public get evolutionInfo(): string|null {

    let evolutionName;
    let evolutionChainInfo = this.evolutionChain.chain.evolves_to[0];
    if (evolutionChainInfo == undefined || evolutionChainInfo == null) { 
      evolutionName = null;
    } else {
      evolutionName = this.evolutionChain.chain.evolves_to[0].species.name;  
    }

    return evolutionName;
  }

  //Return the first type (if dual type)
  public get mainType(): string {
    return this.pokemonObj!.types[0].type.name;
  }

  public get previousId(): number {
    return this.pokemonObj!.id - 1;
  }

  public get nextId(): number {
    return this.pokemonObj!.id + 1;
  }

}
