import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment.prod';
import { finalize, Observable, tap } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { CatalogueService } from './catalogue.service';
import { UserService } from './user.service';


const{apiKey , apiUsers} = environment;

@Injectable({
  providedIn: 'root'
})
export class CollectedPokeService {

  private _loading: boolean = false;

  get loading(): boolean{
    return this._loading;
  }

  constructor(
    private http : HttpClient,
    private readonly pokemonCatalogueService : CatalogueService,
    private readonly userService : UserService
  ) { }

  //Patch request with the userId and the pokemon
  public addToTrainer(pokemonId : number) : Observable<Trainer> {
      if(!this.userService.user){
        throw new Error("addToTrainer:there is no pokemon");
      }
      const user : Trainer = this.userService.user;

      const pokemon : Pokemon | undefined = this.pokemonCatalogueService.pokemonById(pokemonId);

      if(!pokemon){
        throw new Error("addToTrainer :No pokemon with id:" + pokemonId );
      }
      if(this.userService.isCollected(pokemonId)){
        throw new Error("addToTrainer :Pokemon already in trainer" );   
      }
      console.log("Before request!")
      const headers = new HttpHeaders({
        'content-type' : 'application/json',
        'x-api-key' : apiKey
      })

      this._loading = true;

      return this.http.patch<Trainer>(`${apiUsers}/${user.id}`,{
        pokemon: [...user.pokemon, pokemon]
      },{
        headers
      })
      .pipe(
        tap((updatedTrainer : Trainer)=>{
          this.userService.user = updatedTrainer;
        }),
        finalize(() =>{
          this._loading =false;
        })
      )
  }


  public releasePokemon(pokemonId: number): Observable<Trainer> {

    if (!this.userService.user) {
      throw new Error("addToFavourites: There is no user");
    }

    const user: Trainer = this.userService.user;

    this.userService.releasePokemon(pokemonId); 

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey
    })

    return this.http.patch<Trainer>(`${apiUsers}/${user.id}`, {
      pokemon: [...user.pokemon] // already updated
    }, {
      headers
    })
      .pipe(
        tap((updatedUser: Trainer) => {
          console.log("does this run???")
          this.userService.user = updatedUser;
        }),
        finalize(() => {
          console.log("finalized!")
        })
      )
  }
}
