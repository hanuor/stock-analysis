import { useScript } from 'hooks/useScript';

export const NewsAd2 = () => {
	useScript('https://www.dianomi.com/js/contextfeed.js');

	return (
		<>
			<div className="news-spns">
				<div
					className="dianomi_context"
					data-dianomi-context-id="411"
				></div>
			</div>
		</>
	);
};
