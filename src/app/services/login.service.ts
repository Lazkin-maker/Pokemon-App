import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment.prod';
import { map, Observable, of, switchMap } from 'rxjs';
import { Trainer } from '../models/trainer.model';


const {apiUsers, apiKey} = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

   //Dependency Injection
   constructor(private readonly http: HttpClient) { }

   // Models, HttpClient ,Observables, and RxJS operators.
 
   // login
   public login(username : string) : Observable<Trainer> { //login function will return an Observable and the type of the Observable will be a User (user model).
    return this.checkUsername(username)
    .pipe(
      switchMap((trainer : Trainer | undefined) =>{
        if(trainer === undefined) { // user does not exist
            return this.createUser(username); //create new one
        }         
        return of(trainer); //otherwise return user..
      // }),
      // tap((user: User) =>{
      //     StorageUtil.storageSave<User>(StorageKeys.User, user)
      })
    )
}



// check if user exists
private checkUsername(username: string) : Observable<Trainer | undefined> {
  return this.http.get<Trainer[]>(`${apiUsers}?username=${username}`)
  .pipe(
    //RxJS operator
    // map((response : User[]) =>{
    //   return response.pop();
    // })

    map((response : Trainer[]) => response.pop()) // if the array is empty ==> return undefind.
  )
}


// IF not user - Create a User
private createUser(username : string) : Observable<Trainer> {
  //trainer
  const trainer = {
    username,
    pokemon:[]
  };

  //headers -> API Key
  const headers = new HttpHeaders({
    "Content-Type": "application/json",
    "x-api-key" : apiKey
  })
  //POST - Create item on the server
  return this.http.post<Trainer>(apiUsers, trainer, {
    headers
  })
}



}
