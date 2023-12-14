import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, map } from 'rxjs';
import { Pokemon } from '../shared/interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokeapiserviceService {

  private readonly baseUrl = "https://pokeapi.co/api/v2/";
  protected allPokemons : BehaviorSubject<Object | null> = new BehaviorSubject<Object | null>(null);
   allPokemons$ = this.allPokemons.asObservable();

  constructor(
    private http : HttpClient
  ) { }

  /**
   * Obtiene listado de pokemons segun el tipo
   *
   * @param {TypePokemon} type
   * @return {*}
   * @memberof PokeapiserviceService
   */
  getTypePokemons(type: TypePokemon): Observable<PokemonReduced[]>{
    return this.http.get<any>(this.baseUrl + `type/${type}`).pipe(map( x =>  {
      return x.pokemon.map((x:any) => {
        let str = x.pokemon.url;
        let idx = str.indexOf('pokemon/') + 8;
        str = str.slice(idx);
        let id = str.slice(0, -1);
        return {id: id, name: x.pokemon.name} as PokemonReduced;
      });
    }));
  }

  getFirePokemons(){
    return this.getTypePokemons(TypePokemon.Fire);
  }
  getElectricPokemons(){
    return this.getTypePokemons(TypePokemon.Electric);
  }
  getRockPokemons(){
    return this.getTypePokemons(TypePokemon.Electric);
  }

  getWaterPokemons(){
    return this.getTypePokemons(TypePokemon.Water);
  }

  getPokemon(id : number): Observable<Pokemon>{
    return this.http.get<Pokemon>(`${this.baseUrl}pokemon/${id}`);
  }

  getAllPokemons():Observable<{[key: string]: PokemonReduced[]}> {
    return forkJoin({
      electric: this.getElectricPokemons(),
      fire: this.getFirePokemons(),
      rock: this.getRockPokemons(),
      water: this.getWaterPokemons(),
    }).pipe(
      map((value=>{
        this.allPokemons.next(value)
        return value;
      }))
    )
  }

}

enum TypePokemon {
  Fire = 10,
  Electric = 13,
  Rock = 6,
  Water = 11
}

export type PokemonReduced = {
  id: number;
  name: string;
}