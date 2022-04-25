import { Component } from '@angular/core';
import { RobotService } from './robot.service';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styles: [
  ]
})

export class RobotComponent {

  constructor(public robot: RobotService) { }

}
