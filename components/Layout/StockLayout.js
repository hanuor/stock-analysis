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
				<div className="flex flex-col h-screen">
					<Header />
					<div className="mx-auto py-5 sm:py-6 w-full xl:max-w-screen-xl">
						<main>
							<StockHeading />
							{children}
						</main>
					</div>
					<Footer />
				</div>
			</StockContext.Provider>
		</>
	);
}
