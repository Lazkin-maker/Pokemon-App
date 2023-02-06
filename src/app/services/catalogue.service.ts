import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment.prod';
import { StorageKeys } from '../enums/storage-keys.enum';
import { FetchPokemonListResponse } from '../models/fetchPokemonListResponse.model';
import { Pokemon } from '../models/pokemon.model';
import { StorageUtil } from '../utils/storage.util';


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

    const storedPokemon: Pokemon[] | undefined = StorageUtil.storageRead(StorageKeys.PokemonList)

    if (storedPokemon) {
      this._pokemonList = storedPokemon
      return;
    }

    this.http.get<FetchPokemonListResponse>(apiUrl)
      .subscribe({
        next: (response: FetchPokemonListResponse) => {

          const pokemonData = response.results.map(pokemon => ({
            ...pokemon,
            id: Number(pokemon.url.split('/').slice(-2, -1))
          }));

          StorageUtil.storageSave(StorageKeys.PokemonList, pokemonData)
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
