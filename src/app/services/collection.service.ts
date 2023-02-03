import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, finalize, Observable } from 'rxjs';
import { environment } from 'environment';
import { Trainer } from '../models/trainer.model';
import { UserService } from './user.service';

const { apiKey, apiUsers } = environment;

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(
    private http: HttpClient,
    private readonly userService: UserService,
  ) { }

  public releasePokemon(pokemonId: number): Observable<Trainer> {

    console.log("releasing pokemon with id: " + pokemonId)

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
