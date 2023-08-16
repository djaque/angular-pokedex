import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from './Pokemon.type';

import { NamedAPIResource, PokemonClient, Pokemon as Poke } from 'pokenode-ts';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  imageBase = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home";
  pokemonsPerPage = 12;
  apiCli = new PokemonClient();


  constructor(private http: HttpClient) {}

  // Gets a page of pokemons from the API. 
  pokemonPage = async (page: number) => {
    let pokePage : NamedAPIResource[];
    if (!page) {
      page = 1;
    }
    const offset = (page - 1) * this.pokemonsPerPage;
    pokePage = (await this.apiCli.listPokemons(offset, this.pokemonsPerPage)).results;
    return pokePage;
  }; 

  // Initialize the page of pokemon listing
  initPokemonList = async () => {
    const pokePage: NamedAPIResource[] = await this.pokemonPage(1);
    let pokemons: Pokemon[] = pokePage.map(
      (pokemon: NamedAPIResource) => {
        const id: number = parseInt(pokemon.url.split('/')[6]);
        let description: string = "";
        return {
          id: id,
          name: pokemon.name,
          image: `${this.imageBase}/${id}.png`,
          description: description
        };
      }
    );

    for (let index = 0; index < pokemons.length; index++) {
      const id = pokemons[index].id;
      const species = await this.apiCli.getPokemonSpeciesById(id);
      const flavor_text_entries = species.flavor_text_entries.filter(
        (entry: any) => entry.language.name === 'es'
      );
      pokemons[index].description = flavor_text_entries[0].flavor_text;
    }
    return pokemons
  };
}