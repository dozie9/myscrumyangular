import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  public dataService: DataService

  constructor(private _dataService: DataService, private router: Router) { this.dataService = this._dataService}

  ngOnInit() {
    if(this.dataService.checkLoggedInState()){
      this._dataService.route("scrumboard")
    }
  }

  create(){
    this._dataService.create();
  }
}
