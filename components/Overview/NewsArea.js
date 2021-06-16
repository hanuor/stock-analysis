import { useState, useEffect } from 'react';
import NewsFeed from '@/components/News/_NewsFeed';
import { stockState } from '@State/stockState';
import Axios from 'axios';
import loadStockTwits from '@/Functions/loadStockTwits';

const NewsArea = ({ news }) => {
	const info = stockState((state) => state.info);
	const [data, setData] = useState(news);
	const [type, setType] = useState('all');
	const [firstRender, setFirstRender] = useState(true);

	const common = ' outline-none focus:outline-none';
	const active = 'text-gray-900 font-semibold' + common;
	const inactive = 'bll' + common;

	const originalData = news;

	useEffect(() => {
		let url = `https://stockanalysis.com/wp-json/sa/news?i=${info.id}&f=${type}`;
		let source = Axios.CancelToken.source();

		const fetchNews = async () => {
			try {
				let resp = await Axios.get(url, {
					cancelToken: source.token,
					timeout: '5000',
				});
				let newData = await resp.data;
				setData(newData);
			} catch {
				console.log('There was an error fetching news of type: ' + type);
			}
		};

		if (firstRender) {
			setFirstRender(false);
		} else {
			if (type === 'all') {
				setData(originalData);
			} else if (type === 'v' || type === 'pr') {
				fetchNews();
			} else if (type === 'chat') {
				console.log('load chat');
				loadStockTwits(info.ticker);
			}
		}

		return () => {
			source.cancel('Unmounted');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type]);

	if (news.length === 0) {
		return (
			<div className="px-4 md:px-0 mt-6 lg:mt-0">
				<h2 className="hh2 mb-2">News</h2>
				<span className="text-xl">There are no news available yet.</span>
			</div>
		);
	}

	return (
		<>
			<div className="px-4 md:px-0 mt-6 lg:mt-0">
				<h2 className="hh2 mb-2">News</h2>
				<div className="text-smaller xs:text-base">
					<ul className="flex flex-row space-x-2.5 xs:space-x-5">
						<li>
							<button
								className={type === 'all' ? active : inactive}
								onClick={() => setType('all')}>
								All
							</button>
						</li>
						<li>
							<button
								className={type === 'v' ? active : inactive}
								onClick={() => setType('v')}>
								Videos
							</button>
						</li>
						<li>
							<button
								className={type === 'pr' ? active : inactive}
								onClick={() => setType('pr')}>
								Press Releases
							</button>
						</li>
						<li>
							<button
								className={type === 'chat' ? active : inactive}
								onClick={() => setType('chat')}>
								Conversation
							</button>
						</li>
					</ul>
				</div>
			</div>
			{type !== 'chat' ? (
				<NewsFeed data={data} related="Other symbols" />
			) : (
				<div id="altwrap" className="pt-2 overflow-x-auto"></div>
			)}
		</>
	);
};

export default NewsArea;
