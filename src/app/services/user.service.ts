import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
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
    // const storedUser : User | undefined = StorageUtil.storageRead<User>(StorageKeys.User); // when defining a variable.. we cannot use ? instead of undefined
    // this._user = storedUser;
  }
}
