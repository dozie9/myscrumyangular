import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {
  public dataService: DataService;

  constructor(private _dataService:DataService, private router: Router) {
    this.dataService = this._dataService
    console.log("login component calls its constructor")

  }

  ngOnInit() {
    if(this.dataService.checkLoggedInState()){
      this.router.navigateByUrl("scrumboard")
    }
  }

  login(){
    this._dataService.login()
  }

}
