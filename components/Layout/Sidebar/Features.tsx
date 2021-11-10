import { authState } from 'state/authState';
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
	const isPro = authState((state) => state.isPro);

	return (
		<div className="space-y-3">
			{FeaturesMap.map((feature) => {
				if (isPro && feature.tagId === 'tag-upgr-nav-widget') {
					return null;
				}
				return (
					<div
						className="bg-white overflow-hidden shadow rounded-lg border relative group"
						key={feature.title}
					>
						<Link href={feature.url} prefetch={false}>
							<a id={feature.tagId}>
								<div className="px-4 py-5 sm:p-6 pointer-events-none">
									<h4 className="hh3 pointer-events-none">
										{feature.title}
									</h4>
									<div className="text-gray-800 pointer-events-none">
										{feature.description}
									</div>
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
				);
			})}
		</div>
	);
}
