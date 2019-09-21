import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {DragulaService} from "ng2-dragula";
import {Subscription} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-all-task-board',
  templateUrl: './all-task-board.component.html',
  styleUrls: ['./all-task-board.component.css']
})
export class AllTaskBoardComponent implements OnInit {
  public dataService: DataService
  public sub: Subscription
  private goalToMove;
  public project_id;

  constructor(private _dataService:DataService, private _dragula: DragulaService, private cookie: CookieService) {
    this.dataService = this._dataService
    this.project_id = this.cookie.get('project_id')

    this.sub = this._dragula.drop().subscribe(value => {
      console.log(value)
      console.log(value.target.id)
      console.log(value.source.className)
      console.log(value.target.attributes)
      if (value.target.id == "remove"){
        this._dataService.deleteGoal(this.goalToMove["id"], this.goalToMove["goal_id"])
      } else{
        this._dataService.moveGoal(this.goalToMove["id"], value.target.id)
      }

      if(value.target.getAttribute('data-name') != value.source.getAttribute('data-name')){
        this._dataService.changeGoalOwner(this.goalToMove["id"],
          value.target.getAttribute('data-name'), value.target.id)
      }
    })

    const goal: any = this._dragula.find('GOAL');
    if (goal !== undefined ) this._dragula.destroy('GOAL');

    this._dragula.createGroup("GOAL", {
      moves: (el, source, handle, sibling) => {
        console.log("MOVE")
        console.log(source.className)
        console.log(el)

        // returns true if you're the project owner
        if (_dataService.project_owner == this.cookie.get('username'))
          return true

        // returns true if source contains your goal
        if(this.cookie.get('username') == source.className)
          return true
      },
      accepts: (el, target, source) => {
        // alert(typeof target.id)
        //returns true if
        // if(source.className == "Owner")
        //   return true
        console.log(this._dataService.project_owner)
        if (_dataService.project_owner == this.cookie.get('username'))
          return true


        if (_dataService.project_owner != this.cookie.get('username') && target.id == "4") {
          return false
        }else{
          return true
        }




        if (_dataService.project_owner != this.cookie.get('username') && target.id == "4")
          alert(target.id)
          return false
      }
    })
  }

  ngOnInit() {
    console.log("inside all task init")
    this._dataService.setUsers();
    this._dataService.getStatusList();
    this._dataService.getProjectsList()
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
      // this.editGoalText(prompt("Edit goal", text));
    }
  }


  ngOnDestroy(): void {
    // this._subscription.unsubscribe()
    this.sub.unsubscribe()
  }
}
