import { screenerDataState } from '../screenerdata.state';
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs';
import { PresetFilters } from './PresetFilters';

export function AboveScreener() {
	const type = screenerDataState((state) => state.type);

	if (type === 'ipo') {
		return null;
	}

	return (
		<>
			<div className="flex">
				<div>
					<Breadcrumbs url="/stock-screener/" />
					<h1 className="hh1">Stock Screener</h1>
				</div>
				<div>
					<PresetFilters />
				</div>
			</div>
		</>
	);
}
