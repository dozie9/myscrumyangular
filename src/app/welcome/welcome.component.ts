import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import {DataService} from "../data.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  public user: User;
  public dataService: DataService;
  constructor(private _user: User, private _dataService: DataService) {
    this.user = this._user;
    this.dataService = this._dataService;
  }

  ngOnInit() {
  }

}
