import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';


export interface PokemonFetchWrapper {
  count: number;
  results: PokemonFetch [];
}

export interface PokemonFetch {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number,
  name: string,
  weight: number,
  height: number,
  order: number,
  species: {
    name: string,
    url: string,
  }
  sprites: {
    front_default: string,
    back_default: string,
    other: {
      "official-artwork": {
        front_default: string;
      }
    }
  }
  stats: {
    base_stat: number,
    stat: {
      name: string,
      url: string,
    }
  }[],
  types: {
    slot: number,
    type: {
      name: string,
      url: string,
    }
  }[];
}

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  private pokemonFetches!: PokemonFetchWrapper;
  private pokemonArray!: Pokemon[];
  private showBackSprite!: boolean[];
  private currentGen: number = 1;
  private disableGenButton: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router) { }

  async ngOnInit() {
    this.pokemonArray = [];

    this.pokemonFetches = await firstValueFrom(this.httpClient.get<PokemonFetchWrapper>('https://pokeapi.co/api/v2/pokemon?limit=151'));

    this.loadPokemon();

    this.showBackSprite = new Array(this.sortedPokemonList.length).fill(false);

  }

  loadPokemon() {
    this.pokemonArray = [];

    this.pokemonFetches.results.forEach(async (pokemonFetch: PokemonFetch) => {
      let pokemon : Pokemon = await firstValueFrom(this.httpClient.get<Pokemon>(pokemonFetch.url));
      this.pokemonArray.push(pokemon);
    });

    this.disableGenButton = false;
  }

  viewPokemon(pokemon: Pokemon) {
    console.log(pokemon);
    this.router.navigate(['/single-pokemon', pokemon.id], { state: { pokemon } });
  }

  public async switchGen(generation: number) {
    if (generation == this.currentGen ) {
      return;
    } else if (this.disableGenButton == false) {
      this.disableGenButton = true;
      switch (generation) {
        case 1: 
          this.pokemonFetches = await firstValueFrom(this.httpClient.get<PokemonFetchWrapper>('https://pokeapi.co/api/v2/pokemon?limit=151'));
          this.loadPokemon();
          this.currentGen = 1;
          break;
        case 2: 
          this.pokemonFetches = await firstValueFrom(this.httpClient.get<PokemonFetchWrapper>('https://pokeapi.co/api/v2/pokemon?limit=100&offset=151'));
          this.loadPokemon();
          this.currentGen = 2;
          break;
        case 3: 
          this.pokemonFetches = await firstValueFrom(this.httpClient.get<PokemonFetchWrapper>('https://pokeapi.co/api/v2/pokemon?limit=135&offset=251'));
          this.loadPokemon();
          this.currentGen = 3;
          break;

        case 4: 
          this.pokemonFetches = await firstValueFrom(this.httpClient.get<PokemonFetchWrapper>('https://pokeapi.co/api/v2/pokemon?limit=107&offset=386'));
          this.loadPokemon();
          this.currentGen = 4;
          break;

        case 5: 
          this.pokemonFetches = await firstValueFrom(this.httpClient.get<PokemonFetchWrapper>('https://pokeapi.co/api/v2/pokemon?limit=156&offset=493'));
          this.loadPokemon();
          this.currentGen = 5;
          break;

        case 6: 
          this.pokemonFetches = await firstValueFrom(this.httpClient.get<PokemonFetchWrapper>('https://pokeapi.co/api/v2/pokemon?limit=121&offset=649'));
          this.loadPokemon();
          this.currentGen = 6;
          break;

        case 7: 
          this.pokemonFetches = await firstValueFrom(this.httpClient.get<PokemonFetchWrapper>('https://pokeapi.co/api/v2/pokemon?limit=88&offset=721'));
          this.loadPokemon();
          this.currentGen = 7;
          break;

        case 8: 
          this.pokemonFetches = await firstValueFrom(this.httpClient.get<PokemonFetchWrapper>('https://pokeapi.co/api/v2/pokemon?limit=96&offset=809'));
          this.loadPokemon();
          this.currentGen = 8;
          break;

        case 9: 
          this.pokemonFetches = await firstValueFrom(this.httpClient.get<PokemonFetchWrapper>('https://pokeapi.co/api/v2/pokemon?limit=105&offset=905'));
          this.loadPokemon();
          this.currentGen = 9;
        break;
      }
    }
  }

  trackByFn(index: number, item: Pokemon) {
    return item.id;
  }

  get pokemonList() { return this.pokemonArray }

  get sortedPokemonList() { return this.pokemonList.sort((a, b) => a.id - b.id) }

  get showBackSpriteList() { return this.showBackSprite }

}
