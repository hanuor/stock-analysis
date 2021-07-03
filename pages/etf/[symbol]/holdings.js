import { Stock } from 'components/Layout/StockLayout';
import { getPageData, getEtfInfo } from 'functions/callBackEnd';
import { stockState } from 'state/stockState';
import { useEffect } from 'react';
import HoldingsTable from 'components/Holdings/_HoldingsTable';
import NewsWidget from 'components/News/NewsWidget';

export default function Holdings({ info, data }) {
	const setInfo = stockState((state) => state.setInfo);
	const setData = stockState((state) => state.setData);

	useEffect(() => {
		setInfo(info);
		setData(data);
	}, [data, info, setData, setInfo]);

	const HeaderFull = () => (
		<>
			{info.ticker} Holdings - {data.data.count}
		</>
	);

	const HeaderEmpty = () => <>{info.ticker} Holdings</>;

	return (
		<Stock>
			<div className="contain">
				<div className="lg:grid grid-cols-sidebar_wide gap-8">
					<div>
						<div className="flex flex-row justify-between items-end mb-1">
							<h1 className="text-xl bp:text-2xl sm:text-2xl font-bold mt-1 mb-0.5 bp:mb-1 sm:mb-2">
								{data.data.count ? <HeaderFull /> : <HeaderEmpty />}
							</h1>

							{data.data.count && (
								<span className="text-gray-700 text-small bp:text-smaller">
									<span className="hidden sm:inline">Updated </span>
									{data.data.updated}
								</span>
							)}
						</div>
						{data.data.count ? (
							<HoldingsTable rawdata={data.data.list} />
						) : (
							<div className="text-lg">
								No holdings were found for the {info.ticker} ETF
							</div>
						)}
					</div>
					<aside className="mt-7 lg:mt-5">
						<NewsWidget
							title={`${info.ticker} News`}
							news={data.news}
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
	const info = await getEtfInfo({ params });
	const data = await getPageData(info.id, 'holdings');

	return {
		props: {
			info,
			data,
		},
		revalidate: 300,
	};
}

export async function getStaticPaths() {
	return { paths: [], fallback: 'blocking' };
}
