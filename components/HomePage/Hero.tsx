import Link from 'next/link';
import { SiteSearch } from 'components/Search/SiteSearch';

// TODO: When removing stock screener link, add back 4 padding to top
export const Hero = () => (
	<>
		<section className="bg-gray-100 py-8 md:py-24 lg:py-40 border-b border-gray-200 shadow-sm px-4 landscape:border-t-2 landscape:md:border-t-0">
			<div className="mx-auto max-w-[850px] text-center">
				<div className="mx-auto my-4 text-xl font-semibold bll relative">
					<Link href="/portfolio" prefetch={false}>
						<a>
							<div className="relative inline">
								Portfolios
								<div className="absolute -right-3 -top-2.5 text-red-500 text-tiny font-bold transform -rotate-6">
									NEW
								</div>
							</div>
						</a>
					</Link>
				</div>
				<h1 className="text-2xl xs:text-3xl md:text-4xl lg:text-[42px] font-bold mb-5 lg:mb-7">
					Search for a stock to start your analysis
				</h1>
				<p className="text-base xs:text-lg md:text-xl lg:text-[22px] mb-4 md:mb-5 lg:mb-7">
					Detailed information on 5000+ stocks, including all the companies
					in the S&P500 index. See stock price quotes, news, financial
					statements and more.
				</p>
				<form action="/search/" method="get" role="search">
					<div className="flex items-center relative mx-auto text-left mb-5 max-w-[95%] md:max-w-[75%] lg:max-w-lg">
						<SiteSearch nav={false} />
					</div>
				</form>
				<p className="text-sm xs:text-base md:text-lg lg:text-[19px]">
					Example searches:{' '}
					<Link href="/stocks/aapl/" prefetch={false}>
						<a className="bll">Apple</a>
					</Link>
					,{' '}
					<Link href="/stocks/tsla/" prefetch={false}>
						<a className="bll">Tesla</a>
					</Link>
					,{' '}
					<Link href="/stocks/msft/" prefetch={false}>
						<a className="bll">MSFT</a>
					</Link>
					,{' '}
					<Link href="/stocks/amzn/" prefetch={false}>
						<a className="bll">AMZN</a>
					</Link>
				</p>
			</div>
		</section>
	</>
);
