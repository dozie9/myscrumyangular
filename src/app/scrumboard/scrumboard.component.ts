import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import { Subscription } from "rxjs";
import {DragulaService} from "ng2-dragula";
import {CookieService} from "ngx-cookie-service";
import {User} from "../user";

@Component({
  selector: 'app-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.css']
})
export class ScrumboardComponent implements OnInit, OnDestroy {
  public dataService: DataService;
  public status = {}
  private goalToMove;
  private sub1: Subscription;
  private sub2: Subscription;
  private user_array: User [] = [];

  constructor(private _dataService: DataService, private _dragula: DragulaService, private _cookie: CookieService) {
    this.dataService = this._dataService
    // this.sub1 = this._dragula.drag().subscribe()
    this.sub2 = this._dragula.drop().subscribe(value => {
      console.log(value)
      console.log(value.target.id)
      console.log(value.target.attributes)
      if (value.target.id == "remove"){
        this._dataService.deleteGoal(this.goalToMove["id"], this.goalToMove["goal_id"])
      } else {
        this._dataService.moveGoal(this.goalToMove["id"], value.target.id)
      }

    })
  }

  ngOnInit() {
    this._dataService.setUsers();
    this._dataService.getStatusList();
    // this._subscription.add(this.sub1)
    // this._subscription.add(this.sub2)
    this.init()
    this._dataService.getProjectsList()
    this.dataService.createUser()
  }

  init(){
    console.log("cookie type: ", typeof this._cookie.get('id'))
    console.log("cookie type allusers: ", this._dataService.allUsers)
    for (let user of this._dataService.allUsers){
      if(user.id == parseInt(this._cookie.get('id'))){
        this.user_array.push(user)
        console.log("in init", this.user_array)
        return
      }
    }
  }

  logout(){
    this._dataService.logout()
  }


  setGoalIDToMove(goal){
    console.log(goal)
    this.goalToMove = goal;
  }

  onTableClick(event){
    let target_parent = event.target.parentNode
    console.log(target_parent)
    if (event.target.parentNode.classList.contains("task-div")){
      let text = target_parent.getElementsByClassName("goal-text").item(0).innerText
      this.editGoalText(prompt("Edit goal", text));
    }
  }

  private editGoalText(text) {
    this._dataService.editGoalText(this.goalToMove["id"], text)
  }

  ngOnDestroy(): void {
    // this._subscription.unsubscribe()
    this.sub2.unsubscribe()
  }
}
