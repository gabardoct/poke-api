import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { CommonModule } from '@angular/common';
import { PokemonComponent } from './pokemon/pokemon.component';
import { SinglePokemonComponent } from './pokemon/single-pokemon/single-pokemon.component';
import { ItemsComponent } from './items/items.component';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    SinglePokemonComponent,
    ItemsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
