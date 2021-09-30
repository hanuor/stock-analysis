import { FilterId } from 'components/StockScreener/screener.types';
import { TOOLTIP_MAP } from 'components/StockScreener/maps/tooltip.map';

export function TooltipContent({ id }: { id: FilterId }) {
	const data = TOOLTIP_MAP.find((item) => item.id === id);

	if (!data) {
		return null;
	}

	return (
		<div className="p-1">
			<h4 className="text-xl font-semibold mb-2">{data.title}</h4>
			<div className="text-smaller border-t border-gray-300 pt-2">
				{data.tooltip}
			</div>
			{data.formula && (
				<div className="text-sm border-t border-gray-300 mt-3 pt-2">
					{data.formula}
				</div>
			)}
		</div>
	);
}
