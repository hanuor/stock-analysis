import { screenerState } from 'components/StockScreener/screener.state';

type Props = {
	name: string;
};

export function ResultsMenuItem({ name }: Props) {
	const resultsMenu = screenerState((state) => state.resultsMenu);
	const setResultsMenu = screenerState((state) => state.setResultsMenu);

	if (resultsMenu === name) {
		return (
			<li>
				<div className="active" data-title={name}>
					{name}
				</div>
			</li>
		);
	}

	return (
		<li>
			<div
				className="inactive"
				data-title={name}
				onClick={() => setResultsMenu(name)}
			>
				{name}
			</div>
		</li>
	);
}
