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
    this._dataService.getAllProjects()
  }

  ngOnInit() {
    if(this.dataService.checkLoggedInState()){
      console.log("BUGGGG")
      this.router.navigateByUrl("scrumboard")
    }
    console.log("BUGGGG OUT")
  }

  login(){
    this._dataService.login()
  }

}
