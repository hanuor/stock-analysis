import { News } from 'types/News';
import { Tickers } from './Tickers';
import { LiteYouTubeEmbed } from './LiteYouTubeEmbed';
import { NewsAds } from './NewsAds';

interface Props {
	index: number;
	item: News;
	related?: string;
}

export const NewsVideo = ({ index, item, related }: Props) => {
	return (
		<>
			{(index === 3 || index === 10) && <NewsAds index={index} />}
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
		</>
	);
};
