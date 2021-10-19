import { authState } from 'state/authState';
import { navState } from 'state/navState';
import { noAds } from 'components/Ads/noAds';
import { News } from 'types/News';

export function Sidebar1Overview({ news }: { news: News[] }) {
	const path = navState((state) => state.path);
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);

	const count = news.length || 0;
	const classes =
		count < 6
			? 'block min-h-[265px] mt-8 sm:hidden sm:mt-0 mx-auto'
			: 'block min-h-[265px] mt-8 sm:hidden lg:block lg:mt-0 lg:min-h-[301px] mx-auto';

	if (!noAds(path.one)) {
		if (status !== 'completed' || (status === 'completed' && !isPro)) {
			return <div id="adngin-sidebar_1-0" className={classes}></div>;
		}
	}

	return null;
}
