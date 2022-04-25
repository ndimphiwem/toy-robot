import { Direction } from "../types/Direction";

const grid = {
    height: 5,
    length: 5,
    cellSize: 125
}

const axisMovements = {
  EAST: [1, 0],
  WEST: [-1, 0],
  NORTH: [0, 1],
  SOUTH: [0, -1],
};

const turnMovements = {
  RIGHT: 1,
  LEFT: -1,
};

const mapDirections: Direction[]  = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

export { grid, axisMovements, turnMovements, mapDirections }