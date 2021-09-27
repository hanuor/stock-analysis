import { GetStaticProps } from 'next';
import { ScreenerData } from 'components/StockScreener/screener.types';
import { getData } from 'functions/API';
import { LayoutFullWidth } from 'components/Layout/LayoutFullWidth';
import { SEO } from 'components/SEO';
import { StockScreener } from 'components/StockScreener/_StockScreener';
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs';

export default function StockScreenerPage({ stocks }: ScreenerData) {
	console.log('page rendered');

	return (
		<>
			<SEO
				title="Stock Screener"
				description="The best stock screener that exists on the internet."
				canonical="stock-screener/"
			/>
			<LayoutFullWidth>
				<div className="contain py-5 xs:py-6">
					<Breadcrumbs url="/stock-screener/" />
					<h1 className="hh1">Stock Screener</h1>
					<StockScreener initial={stocks.data} fullCount={stocks.count} />
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
		revalidate: 6 * 60 * 60,
	};
};
