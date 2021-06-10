import Button from '@/components/Button';

const NewsWidget = ({ news }) => {
	return (
		<div className="border border-gray-200 rounded text-sm p-4">
			<h3 className="hh3">IPO News</h3>
			<ul className="text-gray-700">
				{news.map((item, index) => (
					<li key={index} className="mb-3 last:mb-1">
						{item.time}
						{' - '}
						<a
							href={item.url}
							target="_blank"
							rel="noopener noreferrer nofollow"
							className="bll">
							{item.title}
						</a>
						{' - '}
						{item.source}
					</li>
				))}
			</ul>
			<Button text="More IPO News" url="/ipos/news/" />
		</div>
	);
};

export default NewsWidget;
