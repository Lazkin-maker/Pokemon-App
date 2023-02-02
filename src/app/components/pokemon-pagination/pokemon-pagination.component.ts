import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-pagination',
  templateUrl: './pokemon-pagination.component.html',
  styleUrls: ['./pokemon-pagination.component.css']
})
export class PokemonPaginationComponent {

  @Input() pokemonList: Pokemon[] = [];;
  page: number = 1;

}
