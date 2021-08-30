import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Info } from 'types/Info';
import { HoldingsType } from 'types/Holdings';
import { News } from 'types/News';
import { Stock } from 'components/Layout/StockLayout';
import { SEO } from 'components/SEO';
import { getPageData } from 'functions/callBackEnd';
import { HoldingsTable } from 'components/Holdings/_HoldingsTable';
import { NewsWidget } from 'components/News/NewsWidget';
import { HoldingsPaywall } from 'components/Holdings/HoldingsPaywall';

interface Props {
	info: Info;
	data: HoldingsType;
	news: News[];
}

const Holdings = ({ info, data, news }: Props) => {
	const HeaderFull = () => (
		<>
			{info.ticker} Holdings - {data.count}
		</>
	);

	const HeaderEmpty = () => <>{info.ticker} Holdings</>;

	return (
		<Stock info={info}>
			<SEO
				title={`${info.ticker} ETF Holdings - ${info.name}`}
				description={`A long list of holdings for ${info.ticker} (${info.name}) with details about each stock and its percentage weighting in the ETF.`}
				canonical={`etf/${info.symbol}/holdings/`}
			/>
			<div className="contain mt-3 sm:mt-4">
				<div className="lg:grid grid-cols-sidebar_wide gap-8">
					<div>
						<div className="flex flex-row justify-between items-end mb-1">
							<h2 className="text-xl bp:text-2xl sm:text-2xl font-bold mt-1 mb-0.5 bp:mb-1 sm:mb-2">
								{data.count ? <HeaderFull /> : <HeaderEmpty />}
							</h2>

							{data.count && (
								<span className="text-gray-700 text-small bp:text-smaller">
									<span className="hidden sm:inline">Updated </span>
									{data.updated}
								</span>
							)}
						</div>
						{data.count ? (
							<>
								<HoldingsTable
									key={info.symbol}
									symbol={info.symbol}
									rawdata={data.list}
									fullCount={data.count}
								/>
								<HoldingsPaywall total={data.count} />
							</>
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
};
export default Holdings;

interface IParams extends ParsedUrlQuery {
	symbol: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { symbol } = params as IParams;
	return await getPageData('holdings', symbol, 3600);
};

export const getStaticPaths: GetStaticPaths = async () => {
	return { paths: [], fallback: 'blocking' };
};
