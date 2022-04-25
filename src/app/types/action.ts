import { Robot } from "./robot-state";

export interface Action {
    type: "PLACE" | "REPORT" | "MOVE" | "RIGHT" | "LEFT";
    actionDetails: Robot | null;
  }