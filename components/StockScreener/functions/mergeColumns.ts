import { SingleStock, ColumnId } from 'components/StockScreener/screener.types';

// Merge a new screener column with the existing columns
export function mergeColumns(
	existing: SingleStock[],
	newColumns: SingleStock[],
	columnId: ColumnId
): any {
	const combined: any = existing.map((stock: SingleStock) => {
		const newStock = newColumns.find((newStock: SingleStock) => {
			return stock ? stock.s === newStock.s : false;
		});
		if (newStock && newStock[columnId]) {
			return { ...stock, [columnId]: newStock[columnId] };
		} else {
			return { ...stock, [columnId]: null };
		}
	});

	return combined;
}
