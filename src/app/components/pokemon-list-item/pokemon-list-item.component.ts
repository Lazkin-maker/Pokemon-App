import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Trainer } from 'src/app/models/trainer.model';
import { CollectedPokeService } from 'src/app/services/collected-poke.service';
import { UserService } from 'src/app/services/user.service';
import { PublicURLs } from 'src/app/enums/public-urls.enum';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent {

  @Input() pokemon?: Pokemon;
  public currentUrl: string;
  public pokemonAvatarUrl: string;

  get loading(): boolean {
    return this.collectService.loading;
  }

  constructor(
    private router: Router,
    private readonly userService: UserService,
    private readonly collectService: CollectedPokeService,
  ) {
    this.currentUrl = this.router.url;
    this.pokemonAvatarUrl = PublicURLs.pokemonAvatars;
  }

  public releaseOnClick(pokemonId: number): void {
    this.collectService.releasePokemon(pokemonId)
      .subscribe({
        next: (response: Trainer) => {
          console.log("released pokemon")
        },
        error: (error: HttpErrorResponse) => {
          console.log("ERROR", error.message)
        }
      })
  }

  public onCollectedPoke(pokemonId: number): void {
    this.collectService.addToTrainer(pokemonId)
      .subscribe({
        next: (response: Trainer) => {
          console.log("Next", response);


        },
        error: (error: HttpErrorResponse) => {
          console.log("Error", error.message)
        }
      })
  }

  public isCollected(pokemonId: number): boolean {
    return this.userService.isCollected(pokemonId)
  }
}
