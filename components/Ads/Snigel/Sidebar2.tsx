import { authState } from 'state/authState';
import { navState } from 'state/navState';
import { noAds } from 'components/Ads/noAds';

export function Sidebar2() {
	const path = navState((state) => state.path);
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);

	if (!noAds(path.one)) {
		if (status !== 'completed' || (status === 'completed' && !isPro)) {
			return (
				<div className="mx-auto text-center">
					<div
						id="adngin-sidebar_2-0"
						className="hidden lg:block mx-auto"
					></div>
				</div>
			);
		}
	}

	return null;
}
