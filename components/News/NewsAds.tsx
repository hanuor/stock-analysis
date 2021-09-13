import { authState } from 'state/authState';

import dynamic from 'next/dynamic';
const NewsAd1 = dynamic(() => import('components/Ads/Dianomi/NewsAd1'), {
	ssr: false,
});

import useInView from 'react-cool-inview';

export function NewsAds({ index, count }: { index: number; count: number }) {
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);
	const { observe, inView } = useInView({
		rootMargin: '500px 0px',
		onEnter: ({ unobserve }) => {
			unobserve();
		},
	});

	if (status === 'completed' && !isPro) {
		if (index === 2 || (count < 3 && count === index + 1)) {
			return (
				<div className="news-spns" ref={observe}>
					{inView && <NewsAd1 />}
				</div>
			);
		}
	}

	return null;
}
