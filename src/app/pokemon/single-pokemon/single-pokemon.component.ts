import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../pokemon.component';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { waitForAsync } from '@angular/core/testing';


export interface EvolutionChain {
  id: number,
  chain: ChainLink,
  baby_trigger_item: any, //TODO: add item interface
}

export interface ChainLink {
  evolution_details: EvolutionDetail,
  evolves_to: EvolutionChain,
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
  private evolutionChain!: EvolutionChain;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) { }

  async ngOnInit() {
    this.pokemonObj = history.state.pokemon; // this is the pokemon object passed from the previous page
    this.evolutionChain = await lastValueFrom(this.httpClient.get<EvolutionChain>("https://pokeapi.co/api/v2/evolution-chain/"+this.pokemonObj.id.toString()));
    console.log(this.evolutionChain);
  }

  public get pokemon(): Pokemon {
    return this.pokemonObj;
  }

  public get evolutionInfo(): EvolutionChain {
    return this.evolutionChain;
  }

}
