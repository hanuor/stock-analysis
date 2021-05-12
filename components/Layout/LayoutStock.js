import Meta from "@/components/Meta";
import Header from "@/Layout/Header";
import Footer from "@/Layout/Footer";
import StockHeading from "@/components/Stocks/StockHeading";
import StockContext from "@/components/Context/StockContext";

export default function Stock({ props, children }) {
	return (
		<>
			<StockContext.Provider value={props}>
				<Meta title={props.ticker}></Meta>
				<Header />
				<div className="container max-w-screen-xl py-8">
					<main>
						<StockHeading />
						{children}
					</main>
				</div>
				<Footer />
			</StockContext.Provider>
		</>
	);
}
