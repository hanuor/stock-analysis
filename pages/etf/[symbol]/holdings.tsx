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
import { NewsletterWidget } from 'components/Layout/Sidebar/Newsletter';

interface Props {
	info: Info;
	data: HoldingsType;
	news: News[];
}

const Holdings = ({ info, data, news }: Props) => {
	return (
		<Stock info={info} url={`/etf/${info.symbol}/holdings/`}>
			<SEO
				title={`${info.ticker} ETF Holdings - ${info.name}`}
				description={`A long list of holdings for ${info.ticker} (${info.name}) with details about each stock and its percentage weighting in the ETF.`}
				canonical={`/etf/${info.symbol}/holdings/`}
			/>
			<div className="contain mt-3 sm:mt-4 lg:mt-5">
				<div className="lg:grid grid-cols-sidebar_wide gap-10">
					<div>
						{data.count ? (
							<>
								<HoldingsTable
									key={info.symbol}
									symbol={info.symbol}
									rawdata={data.list}
									fullCount={data.count}
									id={info.id}
								/>
								<div className="text-gray-700 text-small mt-1">
									As of {data.updated}
								</div>
								<HoldingsPaywall total={data.count} />
							</>
						) : (
							<div>
								<h2 className="text-xl bp:text-2xl sm:text-2xl font-bold mt-1 mb-0.5 bp:mb-1 sm:mb-1">
									{info.ticker} Holdings
								</h2>

								<span className="text-lg mt-2">
									No holdings were found for the {info.ticker} ETF
								</span>
							</div>
						)}
					</div>
					<aside className="mt-7 lg:mt-0 space-y-8">
						<NewsletterWidget />
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
