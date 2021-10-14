import { screenerDataState } from 'components/StockScreener/screenerdata.state';
import { GetStaticProps } from 'next';
import { IPOScreenerData } from 'components/StockScreener/screener.types';
import { getData } from 'functions/API';
import { SEO } from 'components/SEO';
import { StockScreener } from 'components/StockScreener/_StockScreener';
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs';
import { IPONavigation } from 'components/IPOs/IPONavigation';

export default function IpoScreenerPage({ ipos }: IPOScreenerData) {
	const fullCount = screenerDataState((state) => state.fullCount);
	const setFullCount = screenerDataState((state) => state.setFullCount);

	if (!fullCount) {
		setFullCount(ipos.count);
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
					<h1 className="hh1">IPO Calendar</h1>
					<IPONavigation />
					<div className="mt-4">
						<StockScreener type="ipo" />
					</div>
				</main>
			</div>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const ipos = await getData('screener?type=intitial');

	return {
		props: {
			ipos,
		},
		revalidate: 4 * 60 * 60,
	};
};
