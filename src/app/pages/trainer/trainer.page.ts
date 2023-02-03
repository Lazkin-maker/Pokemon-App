import { Component } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage {

  get user(): Trainer | undefined {
    return this.userService.user;
  }

  constructor(
    private readonly userService: UserService
  ) { }
}
