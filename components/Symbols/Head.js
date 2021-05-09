import Title from "@/components/Symbols/Title";
import StockPrice from "@/components/Symbols/Price";
import TabNavigation from "@/components/Symbols/TabNavigation";

export default function SymbolHeading({ ticker, name, quote }) {
	return (
		<div>
			<Title ticker={ticker} name={name} quote={quote} />
			<StockPrice quote={quote} />
			<TabNavigation symbol={ticker} />
		</div>
	);
}
