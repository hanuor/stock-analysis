import { authState } from 'state/authState';
import { navState } from 'state/navState';
import { noAds } from 'components/Ads/noAds';

export function Mobile1() {
	const path = navState((state) => state.path);
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);

	if (!noAds(path.one)) {
		if (status !== 'completed' || (status === 'completed' && !isPro)) {
			return (
				<div
					id="ad-banner"
					className="mx-auto text-center overflow-x-auto sm:hidden"
				>
					<div
						id="adngin-in-content_1_mobile-0"
						className="block sm:hidden center-children"
					></div>
				</div>
			);
		}
	}

	return null;
}
