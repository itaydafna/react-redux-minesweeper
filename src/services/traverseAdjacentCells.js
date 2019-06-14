/* checks the existence of all possible adjacent cells based on the provided grid and the row and column of the cell
   in case the adjacent cell exists - it triggers the provided callback with read-only representations of the adjacent cell's row, column and cell data
 */
export default function traverseAdjacentCells({ grid, row, column, callback }) {
	if (grid[row - 1] && grid[row - 1][column - 1]) {
		callback(Object.freeze({ row: row - 1, column: column - 1, cell: grid[row - 1][column - 1] }));
	}
	if (grid[row - 1] && grid[row - 1][column] && grid[row - 1][column].isBomb) {
		callback(Object.freeze({ row: row - 1, column, cell: grid[row - 1][column] }));
	}
	if (grid[row - 1] && grid[row - 1][column + 1] && grid[row - 1][column + 1].isBomb) {
		callback(Object.freeze({ row: row - 1, column: column + 1, cell: grid[row - 1][column + 1] }));
	}
	if (grid[row][column - 1] && grid[row][column - 1].isBomb) {
		callback(Object.freeze({ row, column: column - 1, cell: grid[row][column - 1] }));
	}
	if (grid[row][column + 1] && grid[row][column + 1].isBomb) {
		callback(Object.freeze({ row, column: column + 1, cell: grid[row][column + 1] }));
	}
	if (grid[row + 1] && grid[row + 1][column - 1] && grid[row + 1][column - 1].isBomb) {
		callback(Object.freeze({ row: row + 1, column: column - 1, cell: grid[row + 1][column - 1] }));
	}
	if (grid[row + 1] && grid[row + 1][column] && grid[row + 1][column].isBomb) {
		callback(Object.freeze({ row: row + 1, column, cell: grid[row + 1][column] }));
	}
	if (grid[row + 1] && grid[row + 1][column + 1] && grid[row + 1][column + 1].isBomb) {
		callback(Object.freeze({ row: row + 1, column: column + 1, cell: grid[row + 1][column + 1] }));
	}
}
