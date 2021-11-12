import { screenerDataState } from 'components/StockScreener/screenerdata.state';
import { screenerState } from 'components/StockScreener/screener.state';
import { GetStaticProps } from 'next';
import { ETFScreenerData } from 'components/StockScreener/screener.types';
import { getData } from 'functions/API';
import { SEO } from 'components/SEO';
import { StockScreener } from 'components/StockScreener/_StockScreener';
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs';

export default function ETFScreenerPage({ etfs }: ETFScreenerData) {
	const fullCount = screenerDataState((state) => state.fullCount);
	const setFullCount = screenerDataState((state) => state.setFullCount);
	const type = screenerDataState((state) => state.type);
	const setType = screenerDataState((state) => state.setType);
	const clearFilters = screenerState((state) => state.clearFilters);
	const setResultsMenu = screenerState((state) => state.setResultsMenu);

	if (!fullCount) {
		setFullCount(etfs.count);
	}

	if (type !== 'etfs') {
		setFullCount(etfs.count);
		clearFilters();
		setResultsMenu('General');
		setType('etfs');
	}

	return (
		<>
			<SEO
				title="ETF Screener: Search and Filter ETFS"
				description="An ETF screening tool to search, filter and compare all upcoming ETFSs on the US stock market."
				canonical="/etf/screener/"
			/>
			<div className="contain">
				<main className="w-full pt-5 xs:pt-6">
					<Breadcrumbs url="/etf/screener/" />
					<h1 className="hh1">ETF Screener</h1>
					<div className="mt-4">
						<StockScreener />
					</div>
				</main>
			</div>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const etfs = await getData('etfscreener?type=f?type=initial');

	return {
		props: {
			etfs,
		},
		revalidate: 4 * 60 * 60,
	};
};
