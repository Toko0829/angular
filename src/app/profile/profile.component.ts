import { Component } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  loggedAcc = ""

  constructor(private UsersService: UsersService){}

  ngOnInit():void{
    this.loggedAcc = this.UsersService.getLoggedName();
  }
}
