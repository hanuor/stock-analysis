import { useState, useEffect } from 'react';
import NewsFeed from '@/components/News/_NewsFeed';
import { stockState } from '@State/stockState';
import Axios from 'axios';

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
		const fetchNews = async () => {
			try {
				let resp = await Axios.get(
					`https://stockanalysis26may.local/wp-json/sa/news?i=${info.id}&f=${type}`,
					{ timeout: '5000' }
				);
				let newData = await resp.data;
				setData(newData);
			} catch {
				console.log('There was an error fetching news of type: ' + type);
			}
		};

		if (firstRender) {
			setFirstRender(false);
		} else {
			console.log('The data changed to: ' + type);

			if (type === 'all') {
				setData(originalData);
			} else if (type === 'v' || type === 'pr') {
				fetchNews();
			} else if (type === 'chat') {
				console.log('load chat');
			}
		}
	}, [type]);

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
			<NewsFeed data={data} related="Other symbols" />
		</>
	);
};

export default NewsArea;
