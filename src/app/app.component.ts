import { Component, HostListener, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { grid } from './config/constants';
import { RobotService } from './robot/robot.service';
import { Action } from './types/action';

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
  instructions: any;
  actions: Action[] = [];
  activeInstrunctionIndex = -1;

  constructor(public robotService: RobotService) { }

  ngOnInit(): void {
    this.robotService.robotState.subscribe(robot => {
      this.robot = robot;
    });
    this.getInstructions();
  }

  getInstructions() {
    this.robotService.getInstructions().pipe(
      tap(instructions =>  {
        this.instructions = instructions;
        this.actions = this.robotService.convertInstructions(instructions)
      })
    ).subscribe();
  }

  stepThroughAction() {
    if (this.actions.length > 0 && this.activeInstrunctionIndex < this.actions.length) {
      this.activeInstrunctionIndex++;
      const currentAction = this.actions[this.activeInstrunctionIndex];
      if (!this.robotService.isInTableBounds(this.robot.xPosition, this.robot.yPosition) && currentAction.type !== "PLACE") {
        return;
      }
      this.robotService.issueCommand(currentAction);
    }
  }

  @HostListener('document:keypress', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.stepThroughAction();
    }
  }
}
