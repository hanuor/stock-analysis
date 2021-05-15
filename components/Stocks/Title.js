import { useContext } from "react";
import StockContext from "@/components/Context/StockContext";

export default function Title() {
	const stock = useContext(StockContext);
	// console.log(stock);

	return (
		<div className="mb-4">
			<h1 className="text-2xl font-bold">
				{stock.name_full} ({stock.ticker})
			</h1>
			<div className="text-xs text-gray-600">
				{stock.exchange}: {stock.ticker} &#183; IEX Real-Time Price &#183;
				USD
			</div>
		</div>
	);
}
