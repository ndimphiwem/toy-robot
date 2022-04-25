import { Direction } from "./Direction";

export interface Robot {
    xPosition: number;
    yPosition: number;
    facingDirection: Direction;
    report: boolean
}
