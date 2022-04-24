import { Component } from '@angular/core';
import { grid } from './config/grid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  table = {
    rows: [...Array(grid.height).keys()].reverse(),
    columns: [...Array(grid.length).keys()],
    cellSize: grid.cellSize
  };

  isInTableBounds(xPosition: number, yPosition: number): boolean {
    return xPosition >= 0 && xPosition < this.table.columns.length && yPosition >= 0 && yPosition < this.table.rows.length;
  }
}
