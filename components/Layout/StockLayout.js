import Meta from '@/components/Meta';
import StockHeading from '@/components/StockHeading/_StockHeading';
import stockState from '@State/stockState';

export default function Stock({ children }) {
	const info = stockState((state) => state.info);

	return (
		<>
			<Meta title={info.ticker}></Meta>
			<div className="mx-auto pt-5 pb-10 sm:pt-6 w-full xl:max-w-screen-xl">
				<main>
					<StockHeading type={info.type} id={info.id} />
					{children}
				</main>
			</div>
		</>
	);
}
