import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent {

  @Input() pokemon?: Pokemon;

  public baseUrl: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

  // ngOnInit() {
  //   const pokemonId = this.pokemon?.url.slice(-2, -1) || "1";
  //   this.spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  // }
}
