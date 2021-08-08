import { useState, useEffect } from 'react';
import { NewsFeed } from 'components/News/_NewsFeed';
import { loadStockTwits } from 'functions/loadStockTwits';
import { News } from 'types/News';
import { Info } from 'types/Info';
import { getData } from 'functions/API';

interface Props {
	info: Info;
	news: News[];
	updated: number;
}

export const NewsArea = ({ info, news, updated }: Props) => {
	const [data, setData] = useState(news);
	const [original, setOriginal] = useState(news);
	const [timestamp, setTimestamp] = useState(updated);
	const [type, setType] = useState('all');
	const [firstRender, setFirstRender] = useState(true);

	const updatedTime = new Date(timestamp * 1000);
	const currentTime = new Date();

	const minutesBetween =
		(currentTime.getTime() - updatedTime.getTime()) / 1000 / 60;

	// Check for fresh news if it's been more than 60 minutes
	useEffect(() => {
		async function fetchData() {
			const fresh = await getData(`news-fresh?i=${info.id}`);
			if (news[0] && fresh[0] && news[0].title !== fresh[0].title) {
				setData(fresh);
				setOriginal(fresh);
			}
		}

		if (minutesBetween > 60) {
			setTimestamp(currentTime.getTime());
			fetchData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Fetch data if a menu item has been clicked (videos, press releases, conversation)
	useEffect(() => {
		async function fetchData() {
			const fresh = await getData(`news?i=${info.id}&f=${type}`);
			setData(fresh);
		}

		if (firstRender) {
			setFirstRender(false);
		} else {
			if (type === 'all') {
				setData(original);
			} else if (type === 'v' || type === 'pr') {
				fetchData();
			} else if (type === 'chat') {
				loadStockTwits(info.ticker);
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type]);

	if (!news || news.length === 0) {
		return (
			<div className="px-4 md:px-0 mt-6 lg:mt-0">
				<h2 className="hh2 mb-2">News</h2>
				<span className="text-xl">There is no news available yet.</span>
			</div>
		);
	}

	return (
		<>
			<div className="px-4 md:px-0 mt-6 lg:mt-0">
				<h2 className="hh2 mb-2">News</h2>
				<div className="text-smaller xs:text-base mb-0.5">
					<ul className="flex flex-row justify-between bp:justify-start bp:space-x-5 whitespace-nowrap">
						<li>
							<button
								className={type === 'all' ? 'font-semibold' : 'bll'}
								onClick={() => setType('all')}
							>
								All
							</button>
						</li>
						<li>
							<button
								className={type === 'v' ? 'font-semibold' : 'bll'}
								onClick={() => setType('v')}
							>
								Videos
							</button>
						</li>
						{info.type === 'stocks' && (
							<li>
								<button
									className={type === 'pr' ? 'font-semibold' : 'bll'}
									onClick={() => setType('pr')}
								>
									Press
									<span className="hidden xs:inline"> Releases</span>
								</button>
							</li>
						)}
						<li>
							<button
								className={type === 'chat' ? 'font-semibold' : 'bll'}
								onClick={() => setType('chat')}
							>
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
