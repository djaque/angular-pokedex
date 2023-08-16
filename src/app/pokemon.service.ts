import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from './Pokemon.type';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  imageBase = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home";
  descriptionBase = "https://pokeapi.co/api/v2/pokemon-species";
  tempDesc = "";

  constructor(private http: HttpClient) {}

  // Get the pokemon description
  getPokemonDescription(id: string): Observable<string> {
    return this.http.get(`${this.descriptionBase}/${id}`).pipe(
      map((response: any) => {
        // Return only spanish texts 
        return response.flavor_text_entries.filter(
          (entry: any) => entry.language.name === 'es'
        )[0].flavor_text ;
      })
    );
  }

  // Get the pokemon list
  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon').pipe(
      map((response: any) => {
        return response.results.map((pokemon: any) => {
          const id: string = pokemon.url.split('/')[6];
          let description: string = "sample";
       

          return {
            id: id,
            name: pokemon.name,
            image: `${this.imageBase}/${id}.png`,
            description: description
          };
        });
      })
    );
  }

}