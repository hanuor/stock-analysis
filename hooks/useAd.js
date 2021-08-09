import { useEffect } from 'react';
import { useNavigating } from 'hooks/useAdReload';

export const useAd = (unit, render, id) => {
	const isNavigating = useNavigating();

	useEffect(() => {
		if (typeof window !== 'undefined' && googletag && !isNavigating) {
			googletag.cmd.push(function () {
				render(googletag);

				googletag.pubads().enableSingleRequest();
				googletag.enableServices();
			});

			googletag.cmd.push(function () {
				googletag.display(id);
			});
		}
	}, [id, isNavigating, render]);
};
