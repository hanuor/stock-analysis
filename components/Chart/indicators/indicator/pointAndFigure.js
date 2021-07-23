/* eslint-disable import/no-anonymous-default-export */
import { rebind } from '../utils';
import { pointAndFigure } from '../calculator';
import baseIndicator from './baseIndicator';
const ALGORITHM_TYPE = 'PointAndFigure';
export default function PointAndFigure() {
	const base = baseIndicator().type(ALGORITHM_TYPE);
	const underlyingAlgorithm = pointAndFigure();
	const indicator = underlyingAlgorithm;
	rebind(indicator, base, 'id', 'stroke', 'fill', 'echo', 'type');
	rebind(
		indicator,
		underlyingAlgorithm,
		'dateAccessor',
		'dateMutator',
		'options'
	);
	return indicator;
}
// # sourceMappingURL=pointAndFigure.js.map
