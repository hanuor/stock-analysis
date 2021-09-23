import { screenerState } from 'components/StockScreener/screener.state';
import { GetStaticProps } from 'next';
import { ScreenerData } from 'components/StockScreener/screener.types';
import { getData } from 'functions/API';
import { LayoutFullWidth } from 'components/Layout/LayoutFullWidth';
import { SEO } from 'components/SEO';
import { StockScreener } from 'components/StockScreener/_StockScreener';
import React, { useEffect } from 'react';
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs';

export default function StockScreenerPage({ stocks }: ScreenerData) {
	const data = screenerState((state) => state.data);
	const setData = screenerState((state) => state.setData);

	useEffect(() => {
		if (!data.length) {
			setData(stocks);
		}
	}, [data.length, setData, stocks]);

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
		revalidate: 6 * 60 * 60,
	};
};
