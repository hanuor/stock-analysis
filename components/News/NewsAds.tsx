import { authState } from 'state/authState';
import { NewsAd1 } from 'components/Ads/Dianomi/NewsAd1';
// import { NewsAd2 } from 'components/Ads/Dianomi/NewsAd2';

export function NewsAds({ index, count }: { index: number; count: number }) {
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);

	if (status === 'completed' && !isPro) {
		if (index === 2 || (count < 3 && count === index + 1)) {
			return <NewsAd1 />;
		}
		// if (index === 10) {
		// 	return <NewsAd2 />;
		// }
	}

	return null;
}
