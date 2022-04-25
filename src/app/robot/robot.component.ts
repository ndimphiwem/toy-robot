import { Component, OnInit } from '@angular/core';
import { RobotService } from './robot.service';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styles: [
  ]
})

export class RobotComponent implements OnInit {

  constructor(public robot: RobotService) { }

  ngOnInit(): void {
    this.robot.robotState.subscribe(robot => {
      console.log('robot', robot);
    })
  }

}
