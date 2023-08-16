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

  async ngOnInit() {
    this.pokemons = await this.pokemonService.initPokemonList()
  }

}