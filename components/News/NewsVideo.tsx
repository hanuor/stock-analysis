import { News } from 'types/News';
import { Tickers } from './Tickers';
import { LiteYouTubeEmbed } from './LiteYouTubeEmbed';
import { NewsAds } from './NewsAds';

interface Props {
	index: number;
	item: News;
	related?: string;
	count: number;
}

export const NewsVideo = ({ index, item, related, count }: Props) => {
	return (
		<>
			<div className="news-video">
				<h3>{item.title}</h3>
				<div className="news-e">
					<LiteYouTubeEmbed id={item.url} title={item.title} />
				</div>
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
			{(index === 2 || (count < 3 && count === index + 1)) && (
				<NewsAds index={index} count={count} />
			)}
		</>
	);
};
