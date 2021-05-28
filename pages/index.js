import Link from 'next/link';
import LayoutFullWidth from '@/Layout/LayoutFullWidth';
import SiteSearch from '@/components/Search/SiteSearch';

export default function FrontPage() {
	return (
		<LayoutFullWidth title="About Us">
			<section className="bg-gray-100 py-20">
				<div className="container max-w-screen-md text-center">
					<h1 className="text-4xl font-bold mb-4">
						Search for a stock to start your analysis
					</h1>
					<p className="text-xl mb-3">
						Detailed information on 6000+ stocks, including all the
						companies in the S&P500 index. See stock price quotes, news,
						financial statements and more.
					</p>
					<div className="flex relative mx-auto text-left mb-3 max-w-md">
						<SiteSearch />
					</div>
					<p className="text-lg">
						Example searches: <Link href="/stocks/aapl/">Apple</Link>,{' '}
						<Link href="/stocks/tsla/">Tesla</Link>,{' '}
						<Link href="/stocks/msft/">MSFT</Link>,{' '}
						<Link href="/stocks/amzn/">AMZN</Link>
					</p>
				</div>
			</section>
		</LayoutFullWidth>
	);
}
