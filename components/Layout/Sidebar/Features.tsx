import { ArrowCTAIcon } from 'components/Icons/ArrowCTA';
import Link from 'next/link';

const FeaturesMap = [
	{
		title: 'Stock Analysis Pro',
		description:
			'Unlimited access to all our financial data with up to 30 years of history.',
		url: '/pro/',
		tagId: 'tag-upgr-nav-widget',
	},
	{
		title: 'IPO Calendar',
		description:
			'All upcoming IPOs on the stock market with detailed statistics and financials.',
		url: '/ipos/calendar/',
		tagId: 'tag-feat-nav-widget-calendar',
	},
	{
		title: 'Stock Screener',
		description:
			'Filter, sort and analyze all stocks to find your next investment.',
		url: '/stock-screener/',
		tagId: 'tag-feat-nav-widget-screener',
	},
	{
		title: 'Market News',
		description:
			"Get the latest news to keep up with what's going on in the markets.",
		url: '/news/',
		tagId: 'tag-feat-nav-widget-news',
	},
];

export function Features() {
	return (
		<div className="space-y-3">
			{FeaturesMap.map((feature) => (
				<div
					className="bg-white overflow-hidden shadow rounded-lg border relative group"
					key={feature.title}
					id={feature.tagId}
				>
					<Link href={feature.url} prefetch={false}>
						<a>
							<div className="px-4 py-5 sm:p-6">
								<h4 className="hh3">{feature.title}</h4>
								<div className="text-gray-800">{feature.description}</div>
								<span
									className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-blue-400"
									aria-hidden="true"
								>
									<ArrowCTAIcon classes="h-6 w-6" />
								</span>
							</div>
						</a>
					</Link>
				</div>
			))}
		</div>
	);
}
