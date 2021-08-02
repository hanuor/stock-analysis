import { authState } from 'state/authState';
import { NewsAd1 } from 'components/Spons/NewsAd1';
import { NewsAd2 } from 'components/Spons/NewsAd2';

export const NewsAds = ({ index }: { index: number }) => {
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);

	if (status === 'completed' && !isPro) {
		if (index === 3) {
			return <NewsAd1 />;
		}
		if (index === 10) {
			return <NewsAd2 />;
		}
	}

	return null;
};