import { SingleStock, FilterId } from 'components/StockScreener/screener.types';

// Merge a new screener column with the existing columns
export function mergeColumns(
	existing: SingleStock[],
	newColumns: SingleStock[],
	id: FilterId
): any {
	const combined: any = existing.map((stock: SingleStock) => {
		const newStock = newColumns.find((newStock: SingleStock) => {
			return stock ? stock.s === newStock.s : false;
		});
		if (newStock && newStock[id]) {
			return { ...stock, [id]: newStock[id] };
		} else {
			return { ...stock, [id]: null };
		}
	});

	return combined;
}
