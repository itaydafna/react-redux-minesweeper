import styled, { css } from 'styled-components';
import { NONE, MARK } from '../types/mark-types';

const cellBaseStyle = css`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 35px;
	width: 35px;
	margin: 1px;
	font-size: 1rem;
	background-color: #c0c0c0;
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
`;
