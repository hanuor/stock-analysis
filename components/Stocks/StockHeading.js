import Title from "@/components/Stocks/Title";
import StockPrice from "@/components/Stocks/StockPrice";
import TabNavigation from "@/components/Stocks/TabNavigation";

export default function StockHeading() {
	return (
		<div className="mx-auto px-4 lg:px-6 mb-4 sm:mb-5">
			<Title />
			<StockPrice />
			<TabNavigation />
		</div>
	);
}
