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
  private _error: string = "";

  get pokemonList(): Pokemon[] {
    return this._pokemonList;
  }

  get error(): string {
    return this._error;
  }

  constructor(private readonly http: HttpClient) { }

  public fetchPokemonList(): void {

    const storedPokemon = sessionStorage.getItem("pokemonList")

    if (storedPokemon !== null) {
      this._pokemonList = JSON.parse(storedPokemon)
      return;
    }

    // const apiUrl: string = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;

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
          console.log(error)
          this._error = error.message;
        }
      })
  }
  public pokemonById(id :number) : Pokemon | undefined{
      return this._pokemonList.find((pokemon: Pokemon) => pokemon.id === id);
  }
}
