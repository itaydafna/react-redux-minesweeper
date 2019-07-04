/* checks the existence of all possible adjacent cells based on the provided grid and the row and column of the cell
   in case the adjacent cell exists - it triggers the provided callback with read-only representations of the adjacent cell's row, column and cell data
 */

interface CellLocation {
	row: number;
	column: number;
}

export default function traverseAdjacentCells({
	grid,
	row,
	column,
	callback,
}: {
	grid: object[][];
	row: number;
	column: number;
	callback: (cellLocation: CellLocation) => void;
}): void {
	if (grid[row - 1] && grid[row - 1][column - 1]) {
		callback(Object.freeze({ row: row - 1, column: column - 1 }));
	}
	if (grid[row - 1] && grid[row - 1][column]) {
		callback(Object.freeze({ row: row - 1, column }));
	}
	if (grid[row - 1] && grid[row - 1][column + 1]) {
		callback(Object.freeze({ row: row - 1, column: column + 1 }));
	}
	if (grid[row][column - 1]) {
		callback(Object.freeze({ row, column: column - 1 }));
	}
	if (grid[row][column + 1]) {
		callback(Object.freeze({ row, column: column + 1 }));
	}
	if (grid[row + 1] && grid[row + 1][column - 1]) {
		callback(Object.freeze({ row: row + 1, column: column - 1 }));
	}
	if (grid[row + 1] && grid[row + 1][column]) {
		callback(Object.freeze({ row: row + 1, column }));
	}
	if (grid[row + 1] && grid[row + 1][column + 1]) {
		callback(Object.freeze({ row: row + 1, column: column + 1 }));
	}
}
