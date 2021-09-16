import { FilterProps } from 'components/StockScreener/screener.types';
import { CustomChoice } from './CustomChoice/_CustomChoice';
import { PresetChoice } from './PresetChoice';

type Props = {
	filter: FilterProps;
	active: string | false;
};

export function NumericFilter({ filter, active }: Props) {
	return (
		<div className="py-1">
			<CustomChoice filter={filter} />
			<div className="max-h-[250px] overflow-y-auto overflow-x-hidden overscroll-contain">
				{filter?.options &&
					filter.options.map((option) => (
						<PresetChoice
							key={option.value}
							option={option}
							columnId={filter.columnId}
							type={filter.filterType}
							active={active}
						/>
					))}
			</div>
		</div>
	);
}
