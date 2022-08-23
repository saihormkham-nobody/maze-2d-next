import { Cell } from "../type";
import reverse from "lodash/reverse";

export const bfs = (maze: number[][], start: Cell, end: Cell) => {
  const maxRow = maze.length;
  const maxCol = maze[0].length;
  // fill two 2D array with zero
  const value = maze.map((array) => array.map((e) => 0));

  // Start Case
  value[start.row][start.col] = 1;
  const queue: Cell[] = [start];

  while (queue.length > 0) {
    const currentCell = queue.shift();

    if (currentCell) {
      for (const cell of [
        { row: 0, col: 1 }, // right
        { row: 0, col: -1 }, // left
        { row: 1, col: 0 }, // top
        { row: -1, col: 0 }, // down
      ]) {
        const row: number = currentCell.row + cell.row;
        const col: number = currentCell.col + cell.col;

        if (
          row >= 0 &&
          row < maxRow &&
          col >= 0 &&
          col < maxCol &&
          value[row][col] === 0 &&
          maze[row][col] !== 1
        ) {
          value[row][col] = value[currentCell.row][currentCell.col] + 1;
          queue.push({ row, col });
        }
      }
    }
  }

  return value;
};

export const getPath = (value: number[][], end: Cell) => {
  const maxRow = value.length;
  const maxCol = value[0].length;
  const path: Cell[] = [];
  let currentRow = end.row;
  let currentCol = end.col;
  let step = 0;
  // currentRow !== start.row && currentCol !== start.col
  let currentValue = value[currentRow][currentCol];
  if (currentValue === 0) return [{ row: 0, col: 0 }];
  while (currentValue != 1) {
    currentValue = value[currentRow][currentCol];
    path.push({ row: currentRow, col: currentCol });

    for (const cell of [
      { row: 0, col: 1 }, // right
      { row: 0, col: -1 }, // left
      { row: 1, col: 0 }, // top
      { row: -1, col: 0 }, // down
    ]) {
      const row: number = currentRow + cell.row;
      const col: number = currentCol + cell.col;
      if (
        row >= 0 &&
        row < maxRow &&
        col >= 0 &&
        col < maxCol &&
        value[row][col] === value[currentRow][currentCol] - 1
      ) {
        currentRow = row;
        currentCol = col;
        break;
      }
    }
  }
  return reverse(path);
};
