import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {Goal} from "../goal";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-goals',
  templateUrl: './add-goals.component.html',
  styleUrls: ['./add-goals.component.css']
})
export class AddGoalsComponent implements OnInit {
  public dataService: DataService;
  public allUsers;
  public statusList;

  constructor(private _dataService: DataService, private router: Router) {
    this.dataService = this._dataService
    if (this._dataService.checkLoggedInState()){
      this.dataService.setUsers();
      this.dataService.getStatusList()
    }
    console.log(this.allUsers)
  }

  ngOnInit() {
    if(this.dataService.checkLoggedInState()){
      this.dataService.goal = new Goal();
      this.allUsers = this.dataService.allUsers;
      this.statusList = this.dataService.statusList;
      console.log(this.statusList)
    }else{
      this.dataService.route("login")
    }

  }

  createNewGoal(){
    this.dataService.createNewGoal();
  }
}

