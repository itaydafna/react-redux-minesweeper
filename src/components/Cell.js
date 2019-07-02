import React from 'react';
import MARK_TYPES from '../constants/MARK_TYPES';

export default function Cell({ cell, onCellClick, onCellRightClick }) {
	return (
		<div
			onClick={onCellClick}
			onContextMenu={event => event.preventDefault() || onCellRightClick()}
			onMouseDown={() => console.log('down')}
			onMouseUp={() => console.log('up')}
			style={{
				height: 40,
				width: 40,
				border: '1px solid black',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				cursor: 'pointer',
			}}
		>
			{!cell.isRevealed && ''}
			{cell.isRevealed && cell.isBomb && '💣'}
			{cell.isRevealed && !cell.isBomb && cell.adjacentBombs}
			{!cell.isRevealed && cell.mark === MARK_TYPES.FLAG && '🚩'}
			{!cell.isRevealed && cell.mark === MARK_TYPES.QUESTION_MARK && '?'}
		</div>
	);
}
