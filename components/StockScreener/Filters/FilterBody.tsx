import { GENERAL } from './filters.map';
import { SingleFilter } from './SingleFilter';

export function FilterBody() {
	return (
		<>
			<div className="grid grid-cols-1 bp:grid-cols-2 lg:grid-cols-4 gap-2 py-3">
				{GENERAL.map((filter) => (
					<SingleFilter key={filter.name} filter={filter} />
				))}
			</div>
		</>
	);
}
