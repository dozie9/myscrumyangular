import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public isLoggedIn: boolean;
  public firstname: string;
  public lastname: string;
  public dataService: DataService;

  constructor(private _dataService: DataService) {
    this.dataService = this._dataService;
    this.isLoggedIn = this._dataService.isLoggedIn
  }

  ngOnInit() {
    if(this._dataService.checkLoggedInState()){
      this._dataService.createUser();
    }
  }

}
