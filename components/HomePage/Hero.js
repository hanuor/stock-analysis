import Link from 'next/link';
import SiteSearch from '@/components/Search/SiteSearch';

export default function Hero() {
	return (
		<>
			<section className="bg-gray-100 py-12 md:py-28 border-b border-gray-200 shadow-sm px-4">
				<div className="mx-auto max-w-screen-md text-center">
					<h1 className="text-2xl xs:text-3xl md:text-4xl font-bold mb-4">
						Search for a stock to start your analysis
					</h1>
					<p className="text-base xs:text-lg md:text-xl mb-4 md:mb-5">
						Detailed information on 5000+ stocks, including all the
						companies in the S&P500 index. See stock price quotes, news,
						financial statements and more.
					</p>
					<div className="flex relative mx-auto text-left mb-4 max-w-[95%] md:max-w-[75%] lg:max-w-lg">
						<SiteSearch nav={false} />
					</div>
					<p className="text-sm xs:text-base md:text-lg">
						Example searches:{' '}
						<Link href="/stocks/aapl/">
							<a className="link">Apple</a>
						</Link>
						,{' '}
						<Link href="/stocks/tsla/">
							<a className="link">Tesla</a>
						</Link>
						,{' '}
						<Link href="/stocks/msft/">
							<a className="link">MSFT</a>
						</Link>
						,{' '}
						<Link href="/stocks/amzn/">
							<a className="link">AMZN</a>
						</Link>
					</p>
				</div>
			</section>
		</>
	);
}
