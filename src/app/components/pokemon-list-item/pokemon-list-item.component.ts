import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Trainer } from 'src/app/models/trainer.model';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent {

  @Input() pokemon?: Pokemon;

  public baseUrl: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

  constructor(
    private readonly collectionService: CollectionService
  ) { }

  public releaseOnClick(pokemonId: number): void {
    this.collectionService.releasePokemon(pokemonId)
      .subscribe({
        next: (response: Trainer) => {
          console.log("released pokemon")
        },
        error: (error: HttpErrorResponse) => {
          console.log("ERROR", error.message)
        }
      })
  }
}
