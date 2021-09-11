import { screenerState } from 'components/StockScreener/screener.state';

type Props = {
	name: string;
};

export function ResultsMenuItem({ name }: Props) {
	const filters = screenerState((state) => state.filters);
	const resultsMenu = screenerState((state) => state.resultsMenu);
	const setResultsMenu = screenerState((state) => state.setResultsMenu);
	const setShowColumns = screenerState((state) => state.setShowColumns);
	const filteredColumns = screenerState((state) => state.filteredColumns);

	let display = name;
	if (name === 'Filtered') {
		display = `${name} (${filters.length})`;
	}

	function handleFilter(name: string) {
		setResultsMenu(name);

		if (name === 'Filtered') {
			setShowColumns(filteredColumns);
		}
	}

	if (resultsMenu === name) {
		return (
			<li>
				<div className="active" data-title={display}>
					{display}
				</div>
			</li>
		);
	}

	return (
		<li>
			<div
				className="inactive"
				data-title={display}
				onClick={() => handleFilter(name)}
			>
				{display}
			</div>
		</li>
	);
}
