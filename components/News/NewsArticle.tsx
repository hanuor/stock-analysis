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
		</>
	);
};
