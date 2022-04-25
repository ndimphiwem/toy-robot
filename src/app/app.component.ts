import { Component, OnInit } from '@angular/core';
import { grid } from './config/constants';
import { RobotService } from './robot/robot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  table = {
    rows: [...Array(grid.height).keys()].reverse(),
    columns: [...Array(grid.length).keys()],
    cellSize: grid.cellSize
  };
  robot: any;

  constructor(public robotService: RobotService) { }

  ngOnInit(): void {
    this.robotService.robotState.subscribe(robot => {
      this.robot = robot;
    });
  }
}
