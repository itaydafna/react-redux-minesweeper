import styled, { css } from 'styled-components';
import { NONE, MARK } from '../types/mark-types';

interface NumberColors {
	[key: number]: string;
}

const numberColors: NumberColors = {
	1: '#0007fe',
	2: '#027f01',
	3: '#fe0001',
	4: '#000180',
	5: '#810002',
	6: '#008081',
	7: '#000000',
	8: '#808080',
};

const cellBaseStyle = css`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 35px;
	width: 35px;
	margin: 1px;
	font-size: 1rem;
	background-color: #c0c0c0;
	font-weight: bold;
`;

export const HiddenCell = styled.button`
	${cellBaseStyle};
	cursor: pointer;
	border: 1.5px solid;
	border-top-color: #ffffff;
	border-right-color: #7b7b7b;
	border-bottom-color: #7b7b7b;
	border-left-color: #ffffff;
	outline: none;

	&:active {
		${({ mark }: { mark?: MARK }) => (!mark || mark === NONE) && 'border-width: 0.5px'};
	}
`;

const selectedConfigButton = css`
	border-width: 0.5px;
	background: #e6f9f8;
`;

export const ConfigOptionButton = styled(HiddenCell)`
	${({ isSelected }: { isSelected?: boolean }) => isSelected && selectedConfigButton};
`;

export const RevealedCell = styled.div`
	${cellBaseStyle};
	color: ${({ adjacentBombs }: { adjacentBombs: number }) => !!adjacentBombs && numberColors[adjacentBombs]};
`;
