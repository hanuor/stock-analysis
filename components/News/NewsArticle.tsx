/* eslint-disable @next/next/no-img-element */
import { News } from 'types/News';
import { Tickers } from './Tickers';
import { NewsAds } from './NewsAds';

interface Props {
	index: number;
	item: News;
	related?: string;
}

export const NewsArticle = ({ index, item, related }: Props) => {
	return (
		<>
			{(index === 3 || index === 10) && <NewsAds index={index} />}
			<div className="news-article">
				<a
					href={item.url}
					target="_blank"
					rel="nofollow noopener noreferrer"
					aria-hidden="true"
					tabIndex={-1}
					className="sm:mt-1"
				>
					<img
						loading="lazy"
						src={item.image}
						width={640}
						height={360}
						alt=""
						className="rounded"
					/>
				</a>
				<div className="flex flex-col">
					<h3 className="hh3 mb-2 mt-3 sm:mt-0 leading-snug sm:leading-tight sm:order-2 hover:text-blue-brand_sharp">
						<a
							href={item.url}
							target="_blank"
							rel="noopener noreferrer nofollow"
						>
							{item.title}
						</a>
					</h3>
					<p className="text-gray-800 sm:order-3 text-[0.95rem]">
						{item.text}
					</p>
					{item.tickers && (
						<div className="mt-1.5 sm:mt-1 sm:order-4">
							<Tickers tickers={item.tickers} intro={related} />
						</div>
					)}

					<div className="mt-1 text-sm text-gray-700 sm:order-1 sm:mt-0">
						<span title={item.timeFull}>{item.timeAgo}</span>
						<span> - {item.source}</span>
					</div>
				</div>
			</div>
		</>
	);
};
