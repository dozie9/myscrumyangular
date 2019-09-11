import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public dataService: DataService;
  constructor(private http: HttpClient, private _dataService: DataService) {
    this.dataService = this._dataService;
  }

  ngOnInit(){
    if(this.dataService.checkLoggedInState()){
      this._dataService.route("scrumboard")
    }

    this._dataService.route("login")
  }

  onClick(){
    let url = "http://127.0.0.1:8000/nwankwochibikescrumy/api/users/";
    this.http.get(url).subscribe(
      data => console.log(data),
      error1 => console.log(error1),
      () => console.log('completed')
    );
  }
}
