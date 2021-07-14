import { Stock } from 'components/Layout/StockLayout';
import { SEO } from 'components/SEO';
import { getEtfInfo } from 'functions/callBackEnd';
import stockState from 'state/stockState';
import { useEffect } from 'react';

export default function SymbolStatistics({ info }) {
	const setInfo = stockState((state) => state.setInfo);

	useEffect(() => {
		setInfo(info);
	}, [info, setInfo]);

	return (
		<Stock>
			<SEO
				title={`${info.ticker} Interactive Stock Chart`}
				description={`Interactive stock chart for ${info.name} (${info.ticker}) with full price history, volume, trends and moving averages.`}
				canonical={`stocks/${info.symbol}/chart/`}
			/>
			<h2 className="text-2xl font-bold my-8">
				This is the chart page for {info.ticker}
			</h2>
		</Stock>
	);
}

export async function getStaticProps({ params }) {
	const info = await getEtfInfo({ params });

	return {
		props: {
			info,
		},
		revalidate: 3600,
	};
}

export async function getStaticPaths() {
	return { paths: [], fallback: 'blocking' };
}
