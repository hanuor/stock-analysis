import { screenerDataState } from 'components/StockScreener/screenerdata.state';
import { screenerState } from 'components/StockScreener/screener.state';
import { GetStaticProps } from 'next';
import { ScreenerData } from 'components/StockScreener/screener.types';
import { getData } from 'functions/API';
import { LayoutFullWidth } from 'components/Layout/LayoutFullWidth';
import { SEO } from 'components/SEO';
import { StockScreener } from 'components/StockScreener/_StockScreener';

export default function StockScreenerPage({ stocks }: ScreenerData) {
	const fullCount = screenerDataState((state) => state.fullCount);
	const setFullCount = screenerDataState((state) => state.setFullCount);
	const type = screenerDataState((state) => state.type);
	const setType = screenerDataState((state) => state.setType);
	const clearFilters = screenerState((state) => state.clearFilters);
	const setResultsMenu = screenerState((state) => state.setResultsMenu);

	if (!fullCount) {
		setFullCount(stocks.count);
	}

	if (type !== 'stock') {
		setFullCount(stocks.count);
		clearFilters();
		setResultsMenu('General');
		setType('stock');
	}

	return (
		<>
			<SEO
				title="Stock Screener: Filter and Analyze Stocks"
				description="A free stock screening tool to search, filter and analyze stocks by almost 100 different indicators and metrics."
				canonical="/stock-screener/"
			/>
			<LayoutFullWidth>
				<div className="contain pt-5 xs:pt-6">
					<StockScreener />
				</div>
			</LayoutFullWidth>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const stocks = await getData('screener?type=initial');

	return {
		props: {
			stocks,
		},
		revalidate: 4 * 60 * 60,
	};
};
