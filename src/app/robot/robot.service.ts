import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { axisMovements, grid, mapDirections, turnMovements } from '../config/constants';;
import { Action } from '../types/action';
import { Direction } from '../types/Direction';
import { Robot } from '../types/robot-state';

@Injectable({
  providedIn: 'root'
})
export class RobotService {
  robot: Robot = {
    xPosition: -1,
    yPosition: -1,
    facingDirection: "EAST",
    report: false
  };
  robotState = new BehaviorSubject<Robot>(this.robot);

  constructor(private http: HttpClient) {
    this.robotState.next(this.robot);
  }

  issueCommand(command: Action) {
    if (this.isValidCommand(command)) {
      this.robot.report = false;
      switch (command.type) {
        case "PLACE":
          if (command.actionDetails) {
            this.placeRobot(command.actionDetails)
          }
          break;
        case "MOVE":
          this.moveRobot();
          break
        case "RIGHT":
        case "LEFT":
          this.turnRobot(command.type);
          break
        case "REPORT":
          this.reportRobot();
          break;
        default:
          break;
      }
    }
  }

  isValidCommand(command: Action): boolean {
    switch (command.type) {
      case "PLACE":
        return command.actionDetails ? true : false;
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

    this.robot.facingDirection = mapDirections[newDirectionIndex];
    this.robotState.next(this.robot);
  }

  placeRobot(updatedRobot: Robot) {
    if (this.isInTableBounds(updatedRobot.xPosition, updatedRobot.yPosition)) {
      this.robot = updatedRobot;
      this.robotState.next(this.robot);
    }
  }

  isInTableBounds(xPosition: number, yPosition: number): boolean {
    return xPosition >= 0 && xPosition < grid.length && yPosition >= 0 && yPosition < grid.height;
  }

  reportRobot() {
    this.robot.report = true;
    this.robotState.next(this.robot);
  }

  convertInstructions(instructions: string[]): Action[] {
    const convertedInstructions = instructions.map((action) => {
      const [type, args] = action.trim().split(/\s/);
      let actionDetails = null;
      if (args && args.split(",").length === 3) {
        const [xPosition, yPosition, facingDirection] = args.split(",");
        actionDetails = {
          xPosition: Number(xPosition),
          yPosition: Number(yPosition),
          facingDirection: facingDirection as Direction,
        };
      }
      return { type: type, actionDetails: actionDetails } as Action;
    });
    return convertedInstructions;
  }

  getInstructions () {
    return this.http.get(environment.commandsPath, { responseType: 'text' }).pipe(
      map(instructions => String(instructions).trim().split(/\r?\n/))
    );
  }
}
