import { Component } from '@angular/core';
import {
  PokeapiserviceService,
  PokemonReduced,
} from './services/pokeapiservice.service';
import { Observable, forkJoin } from 'rxjs';
import { Pokemon } from './shared/interfaces/pokemon.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pokeapp';
  pokemons: Pokemon[] = [];

  constructor(private readonly pokeApiService: PokeapiserviceService) {}

  ngOnInit(){
    this.pokeApiService.allPokemons$.subscribe({
      next: val=>{
        if (val == null) {
          this.pokeApiService.getAllPokemons().subscribe({
            next: (responses: {[key: string]: PokemonReduced[]}) => {
              
              this.getPokemonsFromApi(responses);
            },
          });
      }
    }})
  }

  getPokemonsFromApi(responses: any){
    forkJoin({
      electric: this.pokeApiService.getPokemon(this.getPokemonRamdom(responses['electric']).id),
      fire: this.pokeApiService.getPokemon(this.getPokemonRamdom(responses['fire']).id),
      rock: this.pokeApiService.getPokemon(this.getPokemonRamdom(responses['rock']).id),
      water: this.pokeApiService.getPokemon(this.getPokemonRamdom(responses['water']).id),
    }).subscribe((pokemons) => {
      this.addToListOfPokemons(pokemons);
    })
  }

  addToListOfPokemons(pokemons: any){
      this.pokemons = [];
      pokemons.electric.type = "electric";
      pokemons.fire.type = "fire";
      pokemons.rock.type = "rock";
      pokemons.water.type = "water";
      //la manera mas peresoza de asignarle el tipo :).
      this.pokemons.push(pokemons.electric);
      this.pokemons.push(pokemons.fire);
      this.pokemons.push(pokemons.rock);
      this.pokemons.push(pokemons.water);
  }

  formNewTeam(){
    this.pokeApiService.allPokemons$.subscribe({
      next: pokemonsSaved =>{
        this.getPokemonsFromApi(pokemonsSaved)
      }
    })
  }

  getPokemonRamdom(pokemons: Array<PokemonReduced>) {
    const arrayIndex = Math.floor(Math.random() * pokemons.length);
    return pokemons[arrayIndex];
  }
}