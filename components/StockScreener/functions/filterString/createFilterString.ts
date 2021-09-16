// Filter parameters are stored as strings that can be parsed into their individual components
// This function creates a string from the components

import { ComparisonOption } from 'components/StockScreener/screener.types';

type Props = {
	compare: ComparisonOption;
	first: string;
	second?: string;
};

export function createFilterString({ compare, first, second }: Props) {
	let filterString = `${compare}-${first}`;
	if (second) {
		filterString += `-${second}`;
	}
	return filterString;
}
