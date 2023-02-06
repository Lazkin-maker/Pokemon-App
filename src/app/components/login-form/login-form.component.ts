import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Trainer } from 'src/app/models/trainer.model';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  @Output() login: EventEmitter<void> = new EventEmitter(); // this will create eventEmitter which will emitt events to the parent component that is hosting login-form(loginPage) ==> which the the loginPage will receive that notification

  constructor(
    private readonly userService :UserService,
    private readonly loginService : LoginService){}

  /**
   * Handles login logic for when user logs in
   * @param loginForm A NgForm element
   */
  public loginSubmit(loginForm : NgForm) : void {
    const {username} = loginForm.value;
    
    this.loginService.login(username)
      .subscribe({
        next: (user : Trainer) =>{
            this.userService.user = user;
            this.login.emit();
          },
        error: (error) =>{
          console.log("loginSubmit: " + error.message)
        }
      })
  }
}
