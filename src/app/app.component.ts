import { Component,OnInit} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from './services/user.service';
import {StorageKeys} from './enums/storage-keys.enum'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pokemonApp';
  isLoginPage = false;
  constructor(
    private readonly userService :UserService,
    private router: Router) {}

  handleLogOut() : void{
    sessionStorage.removeItem(StorageKeys.Trainer);
    this.router.navigateByUrl("/login");
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.router.url === '/login';       
      }
    });

    
  }
}
