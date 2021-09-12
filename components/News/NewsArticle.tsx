/* eslint-disable @next/next/no-img-element */
import { News } from 'types/News';
import { Tickers } from './Tickers';
import { NewsAds } from './NewsAds';

interface Props {
	index: number;
	item: News;
	related?: string;
	count: number;
}

export const NewsArticle = ({ index, item, related, count }: Props) => {
	return (
		<>
			<div className="news-article">
				<a
					href={item.url}
					target="_blank"
					rel="nofollow noopener noreferrer"
					aria-hidden="true"
					tabIndex={-1}
				>
					<img
						loading="lazy"
						src={item.image}
						width={640}
						height={360}
						alt=""
					/>
				</a>
				<div>
					<h3>
						<a
							href={item.url}
							target="_blank"
							rel="noopener noreferrer nofollow"
						>
							{item.title}
						</a>
					</h3>
					<p>{item.text}</p>
					{item.tickers && item.tickers.length > 0 && (
						<div className="news-t">
							<Tickers tickers={item.tickers} intro={related} />
						</div>
					)}

					<div>
						<span title={item.timeFull}>{item.timeAgo}</span>
						<span> - {item.source}</span>
					</div>
				</div>
			</div>
			{(index === 2 || (count < 3 && count === index + 1)) && (
				<NewsAds index={index} count={count} />
			)}
		</>
	);
};
