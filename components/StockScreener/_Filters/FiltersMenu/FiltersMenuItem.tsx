import { screenerState } from 'components/StockScreener/screener.state';

type Props = {
	name: string;
};

export function FiltersMenuItem({ name }: Props) {
	const filterMenu = screenerState((state) => state.filterMenu);
	const setFilterMenu = screenerState((state) => state.setFilterMenu);

	if (filterMenu === name) {
		return (
			<li>
				<span
					className="active cursor-pointer relative"
					data-title={name}
					onClick={() => setFilterMenu('Active')}
				>
					{name}
				</span>
			</li>
		);
	}

	return (
		<li>
			<span
				className="inactive"
				data-title={name}
				onClick={() => setFilterMenu(name)}
			>
				{name}
			</span>
		</li>
	);
}
