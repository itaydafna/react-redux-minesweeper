/* checks the existence of all possible adjacent cells based on the provided gameBoard and the row and column of the cell
   in case the adjacent cell exists - it triggers the provided callback with read-only representations of the adjacent cell's row, column and cell data
 */

interface CellLocation {
	row: number;
	column: number;
}

export default function traverseAdjacentCells({
	numRows,
	numColumns,
	row,
	column,
	callback,
}: {
	numRows: number;
	numColumns: number;
	row: number;
	column: number;
	callback: (cellLocation: CellLocation) => void;
}): void {
	if (row - 1 >= 0) {
		callback({ row: row - 1, column });
	}
	if (row - 1 >= 0 && column - 1 >= 0) {
		callback({ row: row - 1, column: column - 1 });
	}
	if (row - 1 >= 0 && column + 1 < numColumns) {
		callback({ row: row - 1, column: column + 1 });
	}
	if (column - 1 >= 0) {
		callback({ row, column: column - 1 });
	}
	if (column + 1 < numColumns) {
		callback({ row, column: column + 1 });
	}
	if (row + 1 < numRows) {
		callback({ row: row + 1, column });
	}
	if (row + 1 < numRows && column - 1 >= 0) {
		callback({ row: row + 1, column: column - 1 });
	}
	if (row + 1 < numRows && column + 1 < numColumns) {
		callback({ row: row + 1, column: column + 1 });
	}
}
