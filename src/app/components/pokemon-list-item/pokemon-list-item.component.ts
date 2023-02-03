import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
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

  get loading(): boolean{
    return this.collectService.loading;
  }
  constructor(
    private readonly userService : UserService,
    private readonly collectService : CollectedPokeService,
  ){}

  public baseUrl: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
  public showImage :boolean = false;
  


  onCollectedPoke(id: number) : void{
   

    this.collectService.addToTrainer(id)
    .subscribe({
      next: (response :Trainer) =>{
          console.log("Next", response);
          
          
      },
      error: (error: HttpErrorResponse) => {
        console.log("Error" , error.message)
      }
    })
  }
  isCollected(id:number): boolean{
    return this.userService.inTrainer(id)
  }
  ngOnInit() {
  }
}
