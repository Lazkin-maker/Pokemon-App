import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Trainer } from 'src/app/models/trainer.model';
import { CollectedPokeService } from 'src/app/services/collected-poke.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent {


  @Input() pokemon?: Pokemon;

  get loading(): boolean {
    return this.collectService.loading;
  }

  constructor(
    private router: Router,
    private readonly userService: UserService,
    private readonly collectService: CollectedPokeService,
  ) { }

  public baseUrl: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
  public showImage: boolean = false;
  public isTrainerPage: boolean = false;


  ngOnInit() {
    this.router.events.subscribe(event => {
      // if (event instanceof NavigationEnd) {
        this.isTrainerPage = this.router.url === '/trainer';
      // }
    });
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

  public onCollectedPoke(id: number): void {


    this.collectService.addToTrainer(id)
      .subscribe({
        next: (response: Trainer) => {
          console.log("Next", response);


        },
        error: (error: HttpErrorResponse) => {
          console.log("Error", error.message)
        }
      })
  }

  public isCollected(id: number): boolean {
    return this.userService.isCollected(id)
  }

}
