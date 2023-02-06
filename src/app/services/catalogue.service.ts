import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment.prod';
import { FetchPokemonListResponse } from '../models/fetchPokemonListResponse.model';
import { Pokemon } from '../models/pokemon.model';


const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  private _pokemonList: Pokemon[] = [];

  get pokemonList(): Pokemon[] {
    return this._pokemonList;
  }

  constructor(private readonly http: HttpClient) { }

  /**
   * Fetch a list of all pokemon and save it in application state and sessionStorage
   */
  public fetchPokemonList(): void {

    const storedPokemon = sessionStorage.getItem("pokemonList")

    if (storedPokemon !== null) {
      this._pokemonList = JSON.parse(storedPokemon)
      return;
    }

    this.http.get<FetchPokemonListResponse>(apiUrl)
      .subscribe({
        next: (response: FetchPokemonListResponse) => {

          const pokemonData = response.results.map(pokemon => ({
            ...pokemon,
            id: Number(pokemon.url.split('/').slice(-2, -1))
          }));

          sessionStorage.setItem("pokemonList", JSON.stringify(pokemonData))
          this._pokemonList = pokemonData;
        },
        error: (error: HttpErrorResponse) => {
          console.log("Error: ", error.message)
        }
      })
  }

  /**
   * Find a pokemon by its ID
   * @param id ID of the pokemon you want to find 
   * @returns A pokemon with the matching id, else undefined
   */
  public pokemonById(id :number) : Pokemon | undefined{
      return this._pokemonList.find((pokemon: Pokemon) => pokemon.id === id);
  }
}
