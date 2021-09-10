import Script from 'next/script';

export const NewsAd1 = () => {
	return (
		<>
			<div className="news-spns">
				<div
					className="dianomi_context"
					data-dianomi-context-id="410"
				></div>
				<Script
					strategy="lazyOnload"
					src="https://www.dianomi.com/js/contextfeed.js"
					id="dianomi_context_script"
				/>
			</div>
		</>
	);
};
