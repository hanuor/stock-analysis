import { authState } from 'state/authState';
import { noAds } from 'components/Ads/noAds';
import { useNavState } from 'hooks/useNavState';

export function HeaderAd() {
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);
	const { path } = useNavState();

	if (!noAds(path.one)) {
		if (status !== 'completed' || (status === 'completed' && !isPro)) {
			return (
				<div className="hidden md:block bg-gray-100 pt-1 pb-2 mx-auto text-center">
					<div
						className="md:min-h-[111px] mx-auto text-center"
						id="adngin-top_leaderboard-0"
					></div>
				</div>
			);
		}
	}

	return null;
}
