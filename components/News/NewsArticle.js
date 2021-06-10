import Tickers from './Tickers';

const NewsArticle = ({ item, related }) => {
	return (
		<div className="bg-white p-4 sm:px-0 sm:py-6 sm:first:pt-3 shadow sm:shadow-none sm:grid sm:grid-cols-news gap-4 lg:gap-5">
			<div className="sm:mt-1">
				<a
					href={item.url}
					target="_blank"
					rel="nofollow noopener noreferrer">
					<img
						loading="lazy"
						src={item.image}
						width={640}
						height={360}
						alt=""
						className="rounded"
					/>
				</a>
			</div>
			<div className="flex flex-col">
				<h3 className="hh3 mb-2 mt-3 sm:mt-0 leading-snug sm:leading-tight sm:order-2 hover:text-blue-brand_sharp">
					<a
						href={item.url}
						target="_blank"
						rel="noopener noreferrer nofollow">
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
	);
};

export default NewsArticle;
