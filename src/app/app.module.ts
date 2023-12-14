import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PokemonCardComponent } from './shared/components/pokemon-card/pokemon-card.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonCardComponent,
    PokemonCardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
