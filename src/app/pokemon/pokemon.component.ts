import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../Pokemon.type';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent {

  pokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemonService.getPokemonList().subscribe({
      next: (pokemons) => {

        this.pokemons = pokemons.map(
          (pokemon) => {
            this.pokemonService.getPokemonDescription(pokemon.id.toString()).subscribe({
              next: (description) => {
                pokemon.description = description;
              }
            });
            return pokemon;
          }
        );
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  
    
}