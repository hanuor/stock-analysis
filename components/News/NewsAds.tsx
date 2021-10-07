import dynamic from 'next/dynamic';
const NewsAd1 = dynamic(() => import('components/Ads/Dianomi/NewsAd1'), {
	ssr: false,
});
const NewsAd2 = dynamic(() => import('components/Ads/Dianomi/NewsAd2'), {
	ssr: false,
});

import { LazyLoadAd } from 'components/LazyLoad/_LazyLoadAd';

export function NewsAds({ index, count }: { index: number; count: number }) {
	if (index === 2 || (count < 3 && count === index + 1)) {
		return (
			<LazyLoadAd offset={300}>
				<div className="news-spns">
					<NewsAd1 />
				</div>
			</LazyLoadAd>
		);
	} else if (index === 7) {
		return (
			<LazyLoadAd offset={300}>
				<div className="news-spns">
					<NewsAd2 />
				</div>
			</LazyLoadAd>
		);
	}

	return null;
}
