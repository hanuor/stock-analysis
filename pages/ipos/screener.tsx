import { screenerDataState } from 'components/StockScreener/screenerdata.state';
import { screenerState } from 'components/StockScreener/screener.state';
import { GetStaticProps } from 'next';
import { IPOScreenerData } from 'components/StockScreener/screener.types';
import { getData } from 'functions/API';
import { SEO } from 'components/SEO';
import { StockScreener } from 'components/StockScreener/_StockScreener';
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs';
import { IPONavigation } from 'components/IPOs/IPONavigation/_IPONavigation';

export default function IpoScreenerPage({ ipos }: IPOScreenerData) {
	const fullCount = screenerDataState((state) => state.fullCount);
	const setFullCount = screenerDataState((state) => state.setFullCount);
	const type = screenerDataState((state) => state.type);
	const setType = screenerDataState((state) => state.setType);
	const clearFilters = screenerState((state) => state.clearFilters);
	const setResultsMenu = screenerState((state) => state.setResultsMenu);

	if (!fullCount) {
		setFullCount(ipos.count);
	}

	if (type !== 'ipo') {
		setFullCount(ipos.count);
		clearFilters();
		setResultsMenu('General');
		setType('ipo');
	}

	return (
		<>
			<SEO
				title="IPO Screener: Search and Filter Upcoming IPOs"
				description="An IPO screening tool to search, filter and compare all upcoming IPOs on the US stock market."
				canonical="/ipos/screener/"
			/>
			<div className="contain">
				<main className="w-full pt-5 xs:pt-6">
					<Breadcrumbs url="/ipos/screener/" />
					<h1 className="hh1">IPO Screener</h1>
					<IPONavigation path="screener" />
					<div className="mt-4">
						<StockScreener />
					</div>
				</main>
			</div>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const ipos = await getData('iposcreener?type=initial');

	return {
		props: {
			ipos,
		},
		revalidate: 4 * 60 * 60,
	};
};
