// Regular comment
// Todo: Turn the hero section into a separate component

import LayoutFullWidth from "@/Layout/LayoutFullWidth";

export default function FrontPage() {
	return (
		<LayoutFullWidth title="About Us">
			<section className="bg-gray-100 py-20">
				<div className="container max-w-screen-md text-center">
					<h1 className="text-4xl font-bold mb-4">Search for a stock to start your analysis</h1>
					<p className="text-xl mb-3">Detailed information on 6000+ stocks, including all the companies in the S&P500 index. See stock price quotes, news, financial statements and more.</p>
					<div className="mb-3">
						<input className="p-2 border border-gray-300" type="search" placeholder="Company or stock ticker..." />
						<button className="bg-blue-400 py-2 px-4 text-white font-bold border border-gray-300">Search</button>
					</div>
					<p className="text-lg">Example searches: Apple, Tesla, MSFT, AMZN</p>
				</div>
			</section>
		</LayoutFullWidth>
	);
}