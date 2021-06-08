import NewsArticle from './NewsArticle';
import NewsVideo from './NewsVideo';

const _NewsFeed = ({ data }) => {
	return (
		<div className="bg-gray-200 sm:bg-white flex flex-col space-y-3 sm:space-y-0 sm:divide-y sm:divide-gray-100">
			{data.map((item, index) => {
				if (item.type === 'Video') {
					return <NewsVideo key={index} item={item} />;
				} else {
					return <NewsArticle key={index} item={item} />;
				}
			})}
		</div>
	);
};

export default _NewsFeed;
