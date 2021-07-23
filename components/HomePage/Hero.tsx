import Link from 'next/link';
import { SiteSearch } from 'components/Search/SiteSearch';

export const Hero = () => (
	<>
		<section className="bg-gray-100 py-12 md:py-28 lg:py-44 border-b border-gray-200 shadow-sm px-4 landscape:border-t-2 landscape:md:border-t-0">
			<div className="mx-auto max-w-[850px] text-center">
				<h1 className="text-2xl xs:text-3xl md:text-4xl lg:text-[42px] font-bold mb-5 lg:mb-7">
					Search for a stock to start your analysis
				</h1>
				<p className="text-base xs:text-lg md:text-xl lg:text-[22px] mb-4 md:mb-5 lg:mb-7">
					Detailed information on 5000+ stocks, including all the companies
					in the S&P500 index. See stock price quotes, news, financial
					statements and more.
				</p>
				<div className="flex relative mx-auto text-left mb-5 max-w-[95%] md:max-w-[75%] lg:max-w-lg">
					<SiteSearch nav={false} />
				</div>
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
