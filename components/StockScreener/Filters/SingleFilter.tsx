import { screenerState } from 'components/StockScreener/screener.state';
import { getData } from 'functions/API';

interface Props {
	filter: {
		name: string;
		options?: string[];
		columnId: string;
	};
}

export function SingleFilter({ filter }: Props) {
	const addDataColumn = screenerState((state) => state.addDataColumn);
	const addColumn = screenerState((state) => state.addColumn);
	const removeColumn = screenerState((state) => state.removeColumn);

	async function fetchNewColumn(value: string) {
		const fetched = await getData(`screener?type=${value}`);
		addDataColumn(fetched, filter.columnId);
	}

	function handleSelection(e: React.ChangeEvent<HTMLSelectElement>) {
		if (filter.columnId) {
			if (e.target.value === 'Any') {
				removeColumn(filter.columnId);
			} else {
				fetchNewColumn(filter.columnId);
				addColumn(filter.columnId);
			}
		}
	}

	return (
		<>
			<div className="inline-flex items-center justify-between border border-gray-100 px-2 py-1">
				<div>{filter.name}</div>
				<div>
					<select
						className="py-1 border-gray-300 rounded"
						onChange={handleSelection}
					>
						<option>Any</option>
						{filter.options &&
							filter.options.map((option) => (
								<option key={option}>{option}</option>
							))}
					</select>
				</div>
			</div>
		</>
	);
}
