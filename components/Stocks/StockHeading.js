import Title from "@/components/Stocks/Title";
import StockPrice from "@/components/Stocks/StockPrice";
import TabNavigation from "@/components/Stocks/TabNavigation";

export default function StockHeading() {
	return (
		<div>
			<Title />
			<StockPrice />
			<TabNavigation />
		</div>
	);
}
