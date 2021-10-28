import { screenerDataState } from '../screenerdata.state';
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs';
import { PresetFilters } from './PresetFilters';
import { SavedFilters } from './SavedFilters/_SavedFilters';

export function AboveScreener() {
	const type = screenerDataState((state) => state.type);

	if (type === 'ipo') {
		return (
			<div className="mb-3 md:mb-0 relative">
				<div className="md:absolute md:right-0 md:top-[-5.1rem]">
					<div className="flex space-x-2 items-center">
						<PresetFilters />
						<SavedFilters />
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="mb-3 md:flex md:mb-0 justify-between">
				<div>
					<Breadcrumbs url="/stock-screener/" />
					<h1 className="hh1">Stock Screener</h1>
				</div>
				<div className="flex space-x-2 items-center">
					<PresetFilters />
					<SavedFilters />
				</div>
			</div>
		</>
	);
}
