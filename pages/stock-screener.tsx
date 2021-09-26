import { screenerDataState } from 'components/StockScreener/screenerdata.state';
import { GetStaticProps } from 'next';
import {
	ScreenerData,
	SingleStock,
} from 'components/StockScreener/screener.types';
import { getData } from 'functions/API';
import { LayoutFullWidth } from 'components/Layout/LayoutFullWidth';
import { SEO } from 'components/SEO';
import { StockScreener } from 'components/StockScreener/_StockScreener';
import React, { useEffect } from 'react';
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs';

async function fetchFullData(
	setData: (data: SingleStock[]) => void,
	setLoaded: (loaded: boolean) => void
) {
	const data = await getData('screener?type=f');
	setData(data.data);
	setLoaded(true);
}

export default function StockScreenerPage({ stocks }: ScreenerData) {
	const data = screenerDataState((state) => state.data);
	const setData = screenerDataState((state) => state.setData);
	const setLoaded = screenerDataState((state) => state.setLoaded);
	const setFullCount = screenerDataState((state) => state.setFullCount);

	useEffect(() => {
		if (!data.length) {
			console.log(stocks.count);
			setFullCount(stocks.count);
			setData(stocks.data);
			fetchFullData(setData, setLoaded);
		}
	}, [data.length, setData, setFullCount, setLoaded, stocks]);

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
