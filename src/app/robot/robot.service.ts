import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { axisMovements, grid, mapDirections, turnMovements } from '../config/constants';;
import { Action } from '../types/action';
import { Robot } from '../types/robot-state';

@Injectable({
  providedIn: 'root'
})
export class RobotService {
  robot: Robot = {
    xPosition: 0,
    yPosition: 0,
    facingDirection: "EAST"
  };
  robotState = new BehaviorSubject<Robot>(this.robot);

  constructor() {
    this.robotState.next(this.robot);
  }

  issueCommand(command: Action) {
    switch (command.type) {
      case "PLACE":
        
        break;
    
      default:
        break;
    }

  }

  isValidCommand(command: Action): boolean {
    console.log("command validation", command);
    switch (command.type) {
      case "PLACE":
        return command?.actionDetails?.xPosition && command?.actionDetails?.yPosition && command?.actionDetails?.facingDirection ? true : false;
      case "REPORT":
      case "RIGHT":
      case "LEFT":
      case "MOVE":
        return true;
      default:
        return false;
    }
  }

  moveRobot() {
    const [xMovement, yMovement] = axisMovements[this.robot?.facingDirection];
    if (this.isInTableBounds(this.robot.xPosition + xMovement, this.robot.yPosition + yMovement)) {
      this.robot.xPosition += xMovement;
      this.robot.yPosition += yMovement;
      this.robotState.next(this.robot);
    }

  }

  turnRobot(turnDirection: "RIGHT" | "LEFT") {
    const currentDirectionIndex = mapDirections.indexOf(this.robot.facingDirection);
    const turnMovement = turnMovements[turnDirection];
    let newDirectionIndex = currentDirectionIndex + turnMovement;

    if (newDirectionIndex > mapDirections.length || newDirectionIndex < 0) {
      newDirectionIndex = newDirectionIndex > mapDirections.length ? 0 : mapDirections.length - 1;
    }

    const newDirection = mapDirections[newDirectionIndex];
    this.robot.facingDirection = newDirection;
    this.robotState.next(this.robot);

  }

  placeRobot() {

  }

  isInTableBounds(xPosition: number, yPosition: number): boolean {
    return xPosition >= 0 && xPosition < grid.length && yPosition >= 0 && yPosition < grid.height;
  }



}
