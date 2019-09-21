import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-blank-project-component',
  templateUrl: './blank-project.component.html',
  styleUrls: ['./blank-project.component.css']
})
export class BlankProjectComponent implements OnInit {

  constructor(private dataService:DataService) {
  }

  ngOnInit() {
    console.log("loading blank form init")
    this.dataService.getAllProjects()
  }

}
