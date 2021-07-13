import NewsArticle from './NewsArticle';
import NewsVideo from './NewsVideo';

const _NewsFeed = ({ data, related }) => {
	return (
		<div className="bg-gray-200 sm:bg-white flex flex-col space-y-3 sm:space-y-0 sm:divide-y sm:divide-gray-100 sm:border-b sm:border-gray-100 lg:border-0">
			{data.map((item, index) => {
				if (item.type === 'Video') {
					return <NewsVideo key={index} item={item} related={related} />;
				} else {
					return <NewsArticle key={index} item={item} related={related} />;
				}
			})}
		</div>
	);
};

export default _NewsFeed;
