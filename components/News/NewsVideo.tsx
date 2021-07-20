import { News } from 'types/News';
import { Tickers } from './Tickers';
import { LiteYouTubeEmbed } from './LiteYouTubeEmbed';

interface Props {
	item: News;
	related?: string;
}

export const NewsVideo = ({ item, related }: Props) => {
	return (
		<div className="news-video">
			<h3 className="hh3 leading-snug sm:leading-tight sm:order-2">
				{item.title}
			</h3>
			<div className="mb-3 sm:order-3 lg:pr-2">
				<LiteYouTubeEmbed id={item.url} title={item.title} />
			</div>
			<p className="text-gray-800 sm:order-4 text-[0.95rem]">{item.text}</p>
			{item.tickers && (
				<div className="mt-1.5 sm:mt-1 sm:order-5">
					<Tickers tickers={item.tickers} intro={related} />
				</div>
			)}
			<div className="mt-1 text-sm text-gray-700 sm:order-1 sm:mt-0">
				<span title={item.timeFull}>{item.timeAgo}</span>
				<span> - {item.source}</span>
			</div>
		</div>
	);
};
