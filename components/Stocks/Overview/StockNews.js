import Link from 'next/link';

export default function StockNews({ props }) {
	return (
		<div>
			<h2 className="px-3 lg:px-0 text-3xl font-bold mb-3">News</h2>
			<div>
				<ul className="px-3 lg:px-0 space-x-5 mb-3">
					<li className="inline">All</li>
					<li className="inline text-blue-brand hover:text-black cursor-pointer">
						Videos
					</li>
					<li className="inline text-blue-brand hover:text-black cursor-pointer">
						Press Releases
					</li>
					<li className="inline text-blue-brand hover:text-black cursor-pointer">
						Conversation
					</li>
				</ul>
			</div>

			<div className="flex flex-col divide-y-8 divide-gray-200 md:divide-y">
				{Object.keys(props).map(function (key, index) {
					return <NewsItem content={props[key]} num={index} key={index} />;
				})}
			</div>
		</div>
	);
}

function NewsItem({ content, num }) {
	const type = content['type'];

	if (type === 'Video') {
		return <NewsArticle content={content} num={num} />;
	}
	return <NewsArticle content={content} num={num} />;
}

function NewsArticle({ content, num }) {
	return (
		<div
			className={`sm:grid sm:grid-cols-news gap-4 px-4 lg:px-0 ${
				num == 0 ? 'pt-2 md:pt-2 pb-4 md:pb-6' : 'py-4 md:py-7'
			}`}>
			<a
				href={content.url}
				target="_blank"
				rel="nofollow noopener noreferrer">
				<img
					loading="lazy"
					src={content.image}
					width={640}
					height={360}
					alt=""
				/>
			</a>

			<div>
				<h3 className="text-xl font-bold mb-1 leading-snug">
					<a
						href={content.url}
						target="_blank"
						rel="nofollow noopener noreferrer"
						className="hover:text-blue-500">
						{content.type == 'Video' && <span>Video: </span>}
						{content.title}
					</a>
				</h3>
				<p className="mb-1">{content.text}</p>
				{content.tickers && content.tickers.length > 0 ? (
					<NewsTickers tickers={content.tickers} />
				) : null}
				<div className="text-sm text-gray-600">
					<span title={content.timeFull}>{content.timeAgo}</span>
					<span> - {content.source}</span>
				</div>
			</div>
		</div>
	);
}

function NewsTickers({ tickers }) {
	if (tickers.length > 0) {
		if (tickers.length > 6) {
			tickers = tickers.slice(0, 6);
		}

		return (
			<div className="mb-1">
				Other tickers mentioned:{' '}
				<span className="space-x-2 my-1">
					{tickers.map(function (ticker, index) {
						return <SingleTicker ticker={ticker} key={index} />;
					})}
				</span>
			</div>
		);
	}
}

function SingleTicker({ ticker }) {
	const symbol = ticker.toLowerCase();

	return (
		<Link href={`/stocks/${symbol}/`}>
			<a className="border border-gray-200 bor px-1 text-sm rounded-md text-blue-sharp hover:text-black">
				{ticker}
			</a>
		</Link>
	);
}

/* function NewsVideo({ content }) {
	return <a>Boo</a>;
} */
