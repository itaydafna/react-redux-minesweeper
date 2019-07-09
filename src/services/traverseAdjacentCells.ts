/* checks the existence of all possible adjacent cells based on the provided gameBoard and the row and column of the cell
   in case the adjacent cell exists - it triggers the provided callback with read-only representations of the adjacent cell's row, column and cell data
 */

interface CellLocation {
	row: number;
	column: number;
}

export default function traverseAdjacentCells({
	gameBoard,
	row,
	column,
	callback,
}: {
	gameBoard: object[][];
	row: number;
	column: number;
	callback: (cellLocation: CellLocation) => void;
}): void {
	if (gameBoard[row - 1] && gameBoard[row - 1][column - 1]) {
		callback(Object.freeze({ row: row - 1, column: column - 1 }));
	}
	if (gameBoard[row - 1] && gameBoard[row - 1][column]) {
		callback(Object.freeze({ row: row - 1, column }));
	}
	if (gameBoard[row - 1] && gameBoard[row - 1][column + 1]) {
		callback(Object.freeze({ row: row - 1, column: column + 1 }));
	}
	if (gameBoard[row][column - 1]) {
		callback(Object.freeze({ row, column: column - 1 }));
	}
	if (gameBoard[row][column + 1]) {
		callback(Object.freeze({ row, column: column + 1 }));
	}
	if (gameBoard[row + 1] && gameBoard[row + 1][column - 1]) {
		callback(Object.freeze({ row: row + 1, column: column - 1 }));
	}
	if (gameBoard[row + 1] && gameBoard[row + 1][column]) {
		callback(Object.freeze({ row: row + 1, column }));
	}
	if (gameBoard[row + 1] && gameBoard[row + 1][column + 1]) {
		callback(Object.freeze({ row: row + 1, column: column + 1 }));
	}
}
