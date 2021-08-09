import { useEffect } from 'react';
import { useNavigating } from 'hooks/useAdReload';

export const useAd = (unit, render) => {
	const isNavigating = useNavigating();

	useEffect(() => {
		if (typeof window !== 'undefined' && googletag && !isNavigating) {
			googletag.cmd.push(function () {
				render(googletag);

				googletag.pubads().enableSingleRequest();
				googletag.enableServices();
			});

			googletag.cmd.push(function () {
				googletag.display('div-gpt-ad-1617185412139-0');
			});
		}
	}, [isNavigating, render]);
};
