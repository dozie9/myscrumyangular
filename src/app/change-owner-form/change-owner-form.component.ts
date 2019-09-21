import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-change-owner-form',
  templateUrl: './change-owner-form.component.html',
  styleUrls: ['./change-owner-form.component.css']
})
export class ChangeOwnerFormComponent implements OnInit {
  public dataService: DataService;
  public user_id: string = "";
  public goal_id: string = ""

  constructor(private _dataService:DataService, private _activatedRoute: ActivatedRoute) {
    this.dataService = this._dataService
    this.goal_id = this._activatedRoute.snapshot.params['goal_id']
  }

  ngOnInit() {
    this._dataService.setUsers()
  }

  changeGoalOwner(){
    //??how do we get the id of the goal we want to affect: soln might be to use the id in the url and get it here
    console.log(this.user_id)
    // this._dataService.changeGoalOwner(this.goal_id, this.user_id)
  }
}
