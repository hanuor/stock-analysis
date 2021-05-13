import Image from "next/image";
import Link from "next/link";

function SingleTicker({ ticker }) {
	const symbol = ticker.toLowerCase();

	return (
		<Link href={`/stocks/${symbol}/`}>
			<a className="border border-gray-200 bor px-1 text-sm rounded-md text-blue-600 hover:text-black">
				{ticker}
			</a>
		</Link>
	);
}

function NewsTickers({ tickers }) {
	if (tickers.length > 0) {
		return (
			<div className="space-x-2 mb-1">
				Other tickers mentioned:{" "}
				{tickers.map(function (ticker, index) {
					return <SingleTicker ticker={ticker} key={index} />;
				})}
			</div>
		);
	}
}

function NewsArticle({ content }) {
	return (
		<div className="grid md:grid-cols-news gap-4 mb-12">
			<a href={content.url} target="_blank" rel="nofollow noopener">
				<Image src={content.image} width={640} height={360} />
			</a>

			<div>
				<h3 className="text-xl font-bold mb-1 leading-snug">
					<a
						href={content.url}
						target="_blank"
						rel="nofollow noopener"
						className="hover:text-blue-500">
						{content.type == "Video" && <span>Video: </span>}
						{content.title}
					</a>
				</h3>
				<p className="mb-1">{content.text}</p>
				{content.tickers.length > 0 && (
					<NewsTickers tickers={content.tickers} />
				)}
				<div className="text-sm text-gray-600">
					<span title={content.timeFull}>{content.timeAgo}</span>
					<span> - {content.source}</span>
				</div>
			</div>
		</div>
	);
}

function NewsVideo({ content }) {
	return <a>Boo</a>;
}

function NewsItem({ content }) {
	const type = content["type"];

	if (type === "Video") {
		return <NewsArticle content={content} />;
	}
	return <NewsArticle content={content} />;
}

export default function StockNews({ props }) {
	return (
		<div>
			<h2 className="text-3xl font-bold mb-3">News</h2>
			<div>
				<ul className="space-x-5 mb-3">
					<li className="inline">All</li>
					<li className="inline text-blue-700 hover:text-black cursor-pointer">
						Videos
					</li>
					<li className="inline text-blue-700 hover:text-black cursor-pointer">
						Press Releases
					</li>
					<li className="inline text-blue-700 hover:text-black cursor-pointer">
						Conversation
					</li>
				</ul>
			</div>
			{Object.keys(props).map(function (key, index) {
				return <NewsItem content={props[key]} key={index} />;
			})}
		</div>
	);
}
