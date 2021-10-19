/* eslint-disable react/no-unescaped-entities */
import { LayoutFullWidth } from 'components/Layout/LayoutFullWidth';
import { SEO } from 'components/SEO';
import Link from 'next/link';

const ExampleJSON = {
	symbol: 'GTLB',
	name: 'GitLab Inc.',
	ipoDate: '2021-10-14',
	ipoPriceLow: 66,
	ipoPriceHigh: 69,
	ipoPriceFinal: 77,
	sharesOffered: 10400000,
	sharesOutstanding: 143014821,
	marketCap: 11012141217,
	country: 'United States',
	exchange: 'NASDAQ',
	sector: 'Technology',
	industry: 'Software-Application',
};

const faqs = [
	{
		question: "What's the difference between the free and paid plan?",
		answer:
			"The free plan only shows the current week's IPOs. It also shows fewer data points and the data is delayed by 1-2 hours.",
	},
	{
		question: 'How often is the data updated?',
		answer:
			'The data is updated multiple times throughout the day. The free version updates in 1-2 hours while the paid plan updates in near real-time (within 10 minutes).',
	},
	{
		question: 'How to subscribe',
		answer:
			"This API is currently offered through RapidAPI, the world's biggest API marketplace. They provide the API keys and handle billing, invoicing and everything related to that.",
	},
	// More questions...
];

export default function ApisPage() {
	return (
		<>
			<SEO
				title="APIs & Data"
				description="We have partnered with Rapid API to offer our comprehensive upcoming IPO calendar as an API. There are both free and paid plans available."
				canonical="/apis/"
			/>
			<LayoutFullWidth>
				<div className="bg-gray-100 border-b border-gray-200 shadow-sm">
					<div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
						<div className="text-center">
							<h1 className="mt-1 text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">
								IPO Calendar API
							</h1>
							<p className="max-w-xl mt-6 mx-auto text-xl text-gray-600">
								We have partnered with Rapid API to offer our
								comprehensive upcoming IPO calendar as an API. There are
								both free and paid plans available.
							</p>
							<a
								href="https://rapidapi.com/stock-analysis-stock-analysis-default/api/upcoming-ipo-calendar"
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className="inline-flex items-center justify-center max-w-sm px-4 py-2 border border-transparent text-xl font-medium rounded-md shadow-sm text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10">
									Get started for free
								</div>
							</a>
						</div>
					</div>
				</div>
				<div>
					<div className="max-w-xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
						<div className="text-center">
							<h2 className="text-left mt-1 text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-4xl">
								Example JSON response
							</h2>
							<div className="text-left text-xl text-gray-600 mt-4">
								This shows what an individual IPO data point looks like
								in the API response.
							</div>
							<div className="text-left mt-5 mx-auto text-xl text-gray-600 overflow-x-auto">
								<pre>{JSON.stringify(ExampleJSON, null, 2)}</pre>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-gray-100 border-t border-b border-gray-200 shadow-sm">
					<div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
						<div className="lg:grid lg:grid-cols-3 lg:gap-8">
							<div>
								<h2 className="text-3xl font-extrabold text-gray-900">
									Frequently asked questions
								</h2>
								<p className="mt-4 text-lg text-gray-600">
									If you have any other questions, reach out to our{' '}
									<Link href="/contact/">
										<a className="font-medium bll">
											customer support
										</a>
									</Link>{' '}
									team.
								</p>
							</div>
							<div className="mt-12 lg:mt-0 lg:col-span-2">
								<dl className="space-y-12">
									{faqs.map((faq) => (
										<div key={faq.question}>
											<dt className="text-lg leading-6 font-medium text-gray-900">
												{faq.question}
											</dt>
											<dd className="mt-2 text-base text-gray-600">
												{faq.answer}
											</dd>
										</div>
									))}
								</dl>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-white">
					<div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
						<div className="text-center">
							<h1 className="mt-1 text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">
								How to get started
							</h1>
							<div className="text-left max-w-xl mt-6 mx-auto text-lg bp:text-xl text-gray-700 space-y-3">
								<div>
									1. Go to the{' '}
									<a
										href="https://rapidapi.com/stock-analysis-stock-analysis-default/api/upcoming-ipo-calendar"
										target="_blank"
										rel="noopener noreferrer"
										className="bll"
									>
										Rapid API
									</a>{' '}
									website.
								</div>
								<div>2. Click "Test Endpoint".</div>
								<div>3. Follow the steps to create an account.</div>
								<div>
									4. Click "Subscribe to Test" to start working with
									the API.
								</div>
							</div>
						</div>
					</div>
				</div>
			</LayoutFullWidth>
		</>
	);
}
