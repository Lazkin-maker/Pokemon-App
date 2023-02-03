import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user? :Trainer;  // ? means (User | undefined) 
  
  get user(): Trainer | undefined {
    return this._user;
  }
  
  set user(user : Trainer | undefined){
    StorageUtil.storageSave<Trainer>(StorageKeys.Trainer, user!); // ! this means that user should not be undefined here..
    this._user = user;
  }

  constructor() {
    this._user = StorageUtil.storageRead<Trainer>(StorageKeys.Trainer); 
  }

  public isCollected(pokemonId: number): boolean {
    if (this._user) {
      return Boolean(this.user?.pokemon.find((pokemon: Pokemon) => pokemon.id === pokemonId))
    }
    return false;
  }

  public catchPokemon(pokemon: Pokemon): void {
    if (this._user) {
      this._user.pokemon.push(pokemon);
    }
  }

  public releasePokemon(pokemonId: number): void {
    if (this._user) {
      this._user.pokemon = this._user.pokemon.filter((pokemon: Pokemon) => pokemon.id !== pokemonId)
    }
  }
}
