import { authState } from 'state/authState';
import { navState } from 'state/navState';
import { noAds } from 'components/Ads/noAds';

export function Sidebar1() {
	const path = navState((state) => state.path);
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);

	if (!noAds(path.one)) {
		if (status !== 'completed' || (status === 'completed' && !isPro)) {
			return (
				<div className="mx-auto text-center">
					<div
						id="adngin-sidebar_1-0"
						className="hidden lg:block lg:min-h-[301px] mx-auto"
					></div>
				</div>
			);
		}
	}

	return null;
}
