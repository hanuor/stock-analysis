import { screenerDataState } from 'components/StockScreener/screenerdata.state';
import { GetStaticProps } from 'next';
import { IPOScreenerData } from 'components/StockScreener/screener.types';
import { getData } from 'functions/API';
import { LayoutFullWidth } from 'components/Layout/LayoutFullWidth';
import { SEO } from 'components/SEO';
import { StockScreener } from 'components/StockScreener/_StockScreener';
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs';

export default function IpoScreenerPage({ ipos }: IPOScreenerData) {
	const fullCount = screenerDataState((state) => state.fullCount);
	const setFullCount = screenerDataState((state) => state.setFullCount);

	if (!fullCount) {
		setFullCount(ipos.count);
	}

	return (
		<>
			<SEO
				title="Stock Screener: Filter and Analyze Stocks"
				description="A free stock screening tool to search, filter and analyze stocks by almost 100 different indicators and metrics."
				canonical="/ipo-screener/"
			/>
			<LayoutFullWidth>
				<div className="contain py-5 xs:py-6">
					<Breadcrumbs url="/IPOs/IPO-Screener/" />
					<h1 className="hh1">IPO</h1>
					<StockScreener type={'ipo'} />
				</div>
			</LayoutFullWidth>
			np
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
