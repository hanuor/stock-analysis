import { screenerDataState } from 'components/StockScreener/screenerdata.state';
import { GetStaticProps } from 'next';
import { ScreenerData } from 'components/StockScreener/screener.types';
import { getData } from 'functions/API';
import { LayoutFullWidth } from 'components/Layout/LayoutFullWidth';
import { SEO } from 'components/SEO';
import { StockScreener } from 'components/StockScreener/_StockScreener';
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs';

export default function StockScreenerPage({ stocks }: ScreenerData) {
	const setData = screenerDataState((state) => state.setData);
	const setFullCount = screenerDataState((state) => state.setFullCount);
	setData(stocks.data);
	setFullCount(stocks.count);

	return (
		<>
			<SEO
				title="Stock Screener: Filter and Analyze Stocks"
				description="A free stock screening tool to search, filter and analyze stocks by almost 100 different indicators and metrics."
				canonical="/stock-screener/"
			/>
			<LayoutFullWidth>
				<div className="contain py-5 xs:py-6">
					<Breadcrumbs url="/stock-screener/" />
					<h1 className="hh1">Stock Screener</h1>
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
		revalidate: 30 * 60,
	};
};