import { SingleStock } from './screener.types';

export function abbreviate(num: number, formatter: Intl.NumberFormat) {
	if (num > 1000000000) {
		return formatter.format(num / 1000000000) + 'B';
	} else if (num > 1000000) {
		return formatter.format(num / 1000000) + 'M';
	} else {
		return formatter.format(num);
	}
}

export const formatNum = (num: number, formatter: Intl.NumberFormat) => {
	return formatter.format(num);
};

export function mergeColumns(
	existing: SingleStock[],
	newColumns: SingleStock[],
	columnId: string
): any {
	// console.log({ existing });
	// console.log({ newColumns });

	const combined: any = existing.map((stock: SingleStock) => {
		const newStock = newColumns.find((newStock: SingleStock) => {
			return stock.s === newStock.s;
		});
		if (newStock) {
			return { ...stock, [columnId]: newStock[columnId] };
		} else {
			return;
		}
	});

	// console.log(combined);

	return combined;
}
