import { GENERAL } from './filters.map';
import { SingleFilter } from './SingleFilter';

export function StockScreenerFilterBody() {
	return (
		<>
			<div className="grid grid-cols-1 bp:grid-cols-2 lg:grid-cols-4 gap-2">
				{GENERAL.map((filter) => (
					<SingleFilter key={filter.name} name={filter.name} />
				))}
			</div>
		</>
	);
}
