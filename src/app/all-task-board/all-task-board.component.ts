import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-all-task-board',
  templateUrl: './all-task-board.component.html',
  styleUrls: ['./all-task-board.component.css']
})
export class AllTaskBoardComponent implements OnInit {
  public dataService: DataService

  constructor(private _dataService:DataService) {
    this.dataService = this._dataService
  }

  ngOnInit() {
    console.log("inside all task init")
    this._dataService.setUsers();
    this._dataService.getStatusList();
    this._dataService.getProjectsList()
  }

}
