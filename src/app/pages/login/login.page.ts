import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageUtil } from 'src/app/utils/storage.util';
import {StorageKeys} from '../../enums/storage-keys.enum'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage implements OnInit {
  constructor(private readonly router: Router) { }

  handleLogin(): void {
    this.router.navigateByUrl("/catalogue");
  }

  ngOnInit(){
    const loggedInUser = StorageUtil.storageRead(StorageKeys.Trainer);
    if(loggedInUser){
      this.router.navigateByUrl("/catalogue")
    }
  }
}
