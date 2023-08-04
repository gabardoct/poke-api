import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './pokemon/pokemon.component';
import { ItemsComponent } from './items/items.component';
import { HomeComponent } from './home/home.component';
import { SinglePokemonComponent } from './pokemon/single-pokemon/single-pokemon.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pokemon', component: PokemonComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'single-pokemon/:id', component: SinglePokemonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
