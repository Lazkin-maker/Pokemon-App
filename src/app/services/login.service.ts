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

  constructor(private readonly http: HttpClient) { }

  /**
   * Login to application using a username
   * @param username Name of user you want to login as
   * @returns A user object from database
   */
  public login(username : string) : Observable<Trainer> { //login function will return an Observable and the type of the Observable will be a User (user model).
    return this.checkUsername(username)
    .pipe(
      switchMap((trainer : Trainer | undefined) =>{
        if(trainer === undefined) { // user does not exist
            return this.createUser(username); //create new one
        }         
        return of(trainer); //otherwise return user..
      })
    )
}



/**
 * Check if a user exists in the database
 * @param username Name of user you want check
 * @returns Observable of user or undefined
 */
private checkUsername(username: string) : Observable<Trainer | undefined> {
  return this.http.get<Trainer[]>(`${apiUsers}?username=${username}`)
  .pipe(
    map((response : Trainer[]) => response.pop()) // if the array is empty ==> returns undefind.
  )
}


/**
 * Create a new user in database
 * @param username Desired username of new user
 * @returns Newly created user object
 */
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
