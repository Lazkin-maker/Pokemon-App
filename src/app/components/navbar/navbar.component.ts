import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() isLoginPage?: boolean;

  constructor(private router: Router) { }

  handleLogOut() : void{
    StorageUtil.storageRemove(StorageKeys.Trainer);
    this.router.navigateByUrl("/login");
  }

}
