import { authState } from 'state/authState';
import { navState } from 'state/navState';
import { noAds } from 'components/Ads/noAds';
import { News } from 'types/News';

export function Sidebar1Overview({ news }: { news: News[] }) {
	const path = navState((state) => state.path);
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);

	if (!noAds(path.one)) {
		if (status !== 'completed' || (status === 'completed' && !isPro)) {
			if (news.length > 5) {
				return (
					<div
						id="ad-banner"
						className="mx-auto text-center overflow-x-auto"
					>
						<div
							id="adngin-sidebar_1-0"
							className="hidden lg:block lg:min-h-[301px] mx-auto center-children"
						></div>
						<div
							id="adngin-in-content_1_mobile-0"
							className="block mt-1 sm:hidden center-children"
						></div>
					</div>
				);
			} else {
				return (
					<div
						id="ad-banner"
						className="mx-auto text-center overflow-x-auto"
					>
						<div
							id="adngin-in-content_1_mobile-0"
							className="block mt-1 sm:hidden center-children"
						></div>
					</div>
				);
			}
		}
	}

	return null;
}
