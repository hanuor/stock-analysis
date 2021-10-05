import { News } from 'types/News';
import { NewsArticle } from './NewsArticle';
import { NewsVideo } from './NewsVideo';

interface Props {
	data: News[];
	related?: string;
	paywalled?: boolean;
}

export const NewsFeed = ({ data, related, paywalled }: Props) => {
	const count = data.length;

	return (
		<div
			className={`bg-gray-200 sm:bg-white flex flex-col space-y-3 sm:space-y-0 sm:divide-y mb-2 sm:divide-gray-100 sm:border-b sm:border-gray-100 lg:border-0${
				paywalled ? ' pw-shadow' : ''
			}`}
		>
			{data.map((item, index) => {
				if (item.type === 'Video') {
					return (
						<NewsVideo
							key={index}
							index={index}
							item={item}
							related={related}
							count={count}
						/>
					);
				} else {
					return (
						<NewsArticle
							key={index}
							index={index}
							item={item}
							related={related}
							count={count}
						/>
					);
				}
			})}
		</div>
	);
};
