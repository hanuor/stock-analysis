import { SEO } from 'components/SEO';
import StockHeading from 'components/StockHeading/_StockHeading';
import stockState from 'state/stockState';

export const Stock = ({ children }) => {
	const info = stockState((state) => state.info);

	return (
		<>
			<SEO
				title={`${info.name} (${info.ticker}) Stock Price, Quote & News`}
			/>
			<div className="mx-auto pt-5 pb-10 sm:pt-6 w-full xl:max-w-screen-xl">
				<main>
					<StockHeading type={info.type} id={info.id} />
					{children}
				</main>
			</div>
		</>
	);
};
