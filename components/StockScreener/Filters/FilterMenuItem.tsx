import { screenerState } from 'components/StockScreener/screener.state';

type Props = {
	name: string;
};

export function FilterMenuItem({ name }: Props) {
	const filterMenu = screenerState((state) => state.filterMenu);
	const setFilterMenu = screenerState((state) => state.setFilterMenu);

	if (filterMenu === name) {
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
				onClick={() => setFilterMenu(name)}
			>
				{name}
			</div>
		</li>
	);
}
