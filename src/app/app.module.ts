import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpCachingModule, NgHttpCachingConfig } from 'ng-http-caching';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonComponent } from './pokemon/pokemon.component';
import { ItemsComponent } from './items/items.component';
import { HomeComponent } from './home/home.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SinglePokemonComponent } from './pokemon/single-pokemon/single-pokemon.component';


const ngHttpCachingConfig: NgHttpCachingConfig = {
  lifetime: 1000 * 60 * 10 // cache expire after 10 minutes
};


@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    ItemsComponent,
    HomeComponent,
    SinglePokemonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule,
    NgHttpCachingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
