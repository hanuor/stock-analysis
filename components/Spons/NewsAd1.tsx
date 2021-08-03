import { useScript } from 'hooks/useScript';

export const NewsAd1 = () => {
	useScript('https://www.dianomi.com/js/contextfeed.js');

	return (
		<>
			<div className="news-spns">
				<div
					className="dianomi_context"
					data-dianomi-context-id="410"
				></div>
			</div>
		</>
	);
};
