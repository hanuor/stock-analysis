import Meta from '@/components/Meta';
import Header from '@/components/Layout/Header/_Header';
import Footer from '@/components/Layout/Footer/_Footer';
import StockHeading from '@/components/StockHeading/_StockHeading';
import stockState from '@State/stockState';

export default function Stock({ children }) {
	const info = stockState((state) => state.info);

	return (
		<>
			<Meta title={info.ticker}></Meta>
			<Header />
			<div className="mx-auto pt-5 pb-10 sm:pt-6 w-full xl:max-w-screen-xl">
				<main>
					<StockHeading type={info.type} />
					{children}
				</main>
			</div>
			<Footer />
		</>
	);
}
