import Tickers from './Tickers';

const NewsVideo = ({ item }) => {
	return (
		<div className="flex flex-col bg-white p-4 sm:px-0 sm:py-6 sm:first:pt-3 shadow sm:shadow-none">
			<h3 className="hh3 leading-snug sm:leading-tight hover:text-blue-brand_sharp sm:order-2">
				{item.title}
			</h3>
			<div className="mb-3 sm:order-3">
				<img
					loading="lazy"
					src={item.image}
					width={640}
					height={360}
					alt=""
					className="rounded"
				/>
			</div>
			<p className="text-gray-800 sm:order-4 text-[0.95rem]">{item.text}</p>
			<div className="mt-1.5 sm:mt-1 sm:order-5">
				<Tickers tickers={item.tickers} intro={'Stocks:'} />
			</div>
			<div className="mt-1 text-sm text-gray-700 sm:order-1 sm:mt-0">
				<span title={item.timeFull}>{item.timeAgo}</span>
				<span> - {item.source}</span>
			</div>
		</div>
	);
};

export default NewsVideo;
