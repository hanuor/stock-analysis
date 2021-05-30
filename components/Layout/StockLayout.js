import Meta from '@/components/Meta';
import Header from '@/Layout/Header';
import Footer from '@/Layout/Footer';
import StockHeading from '@/components/Stocks/StockHeading';
import stockState from '@State/stockState';

export default function Stock({ children }) {
	const info = stockState((state) => state.info);

	return (
		<>
			<Meta title={info.ticker}></Meta>
			<div className="flex flex-col">
				<Header />
				<div className="mx-auto py-5 sm:py-6 w-full xl:max-w-screen-xl">
					<main>
						<StockHeading />
						{children}
					</main>
				</div>
				<Footer />
			</div>
		</>
	);
}
