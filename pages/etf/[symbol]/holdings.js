import { Stock } from 'components/Layout/StockLayout';
import { SEO } from 'components/SEO';
import { getPageData } from 'functions/callBackEnd';
import { stockState } from 'state/stockState';
import { useEffect } from 'react';
import HoldingsTable from 'components/Holdings/_HoldingsTable';
import NewsWidget from 'components/News/NewsWidget';

export default function Holdings({ info, data, news }) {
	const setInfo = stockState((state) => state.setInfo);
	const setData = stockState((state) => state.setData);

	useEffect(() => {
		setInfo(info);
		setData(data);
	}, [data, info, setData, setInfo]);

	const HeaderFull = () => (
		<>
			{info.ticker} Holdings - {data.count}
		</>
	);

	const HeaderEmpty = () => <>{info.ticker} Holdings</>;

	return (
		<Stock type={info.type} id={info.id}>
			<SEO
				title={`${info.ticker} ETF Holdings - ${info.name}`}
				description={`A long list of holdings for ${info.ticker} (${info.name}) with details about each stock and its percentage weighting in the ETF.`}
				canonical={`etf/${info.symbol}/holdings/`}
			/>
			<div className="contain">
				<div className="lg:grid grid-cols-sidebar_wide gap-8">
					<div>
						<div className="flex flex-row justify-between items-end mb-1">
							<h1 className="text-xl bp:text-2xl sm:text-2xl font-bold mt-1 mb-0.5 bp:mb-1 sm:mb-2">
								{data.count ? <HeaderFull /> : <HeaderEmpty />}
							</h1>

							{data.count && (
								<span className="text-gray-700 text-small bp:text-smaller">
									<span className="hidden sm:inline">Updated </span>
									{data.updated}
								</span>
							)}
						</div>
						{data.count ? (
							<HoldingsTable rawdata={data.list} />
						) : (
							<div className="text-lg">
								No holdings were found for the {info.ticker} ETF
							</div>
						)}
					</div>
					<aside className="mt-7 lg:mt-5">
						<NewsWidget
							title={`${info.ticker} News`}
							news={news}
							button={{
								text: 'More News',
								url: `/etf/${info.symbol}/`,
							}}
						/>
					</aside>
				</div>
			</div>
		</Stock>
	);
}

export async function getStaticProps({ params }) {
	const { info, data, news } = await getPageData('holdings', params.symbol);

	return {
		props: {
			info,
			data,
			news,
		},
		revalidate: 3600,
	};
}

export async function getStaticPaths() {
	return { paths: [], fallback: 'blocking' };
}
