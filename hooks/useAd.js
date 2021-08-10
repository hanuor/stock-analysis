import { useEffect } from 'react';
import { useNavigating } from 'hooks/useAdReload';
import { Ads } from 'components/Ads/GPT/AdsList';
import { getAdUnitList } from 'components/Ads/GPT/getAdUnitList';
import { navState } from 'state/navState';

export const useAd = (unit) => {
	const path = navState((state) => state.path);
	const isNavigating = useNavigating();
	// const ad = Ads[unit];

	useEffect(() => {
		if (
			typeof window !== 'undefined' &&
			typeof googletag !== 'undefined' &&
			!isNavigating
		) {
			googletag.cmd.push(function () {
				const list = getAdUnitList(path);

				list.forEach((unit) => {
					console.log({ unit });
					const ad = Ads[unit];
					const mapping = ad.mapping;
					const adMapping = googletag.sizeMapping();
					Object.keys(mapping).forEach((breakpoint) => {
						adMapping.addSize(
							[Number(breakpoint), 0],
							mapping[breakpoint]
						);
					});
					const builtMapping = adMapping.build();

					googletag
						.defineSlot(
							`/2507246/SAN//stockanalysis//misc//${ad.number}`,
							ad.sizes,
							ad.id
						)
						.defineSizeMapping(builtMapping)
						.addService(googletag.pubads());

					googletag.display(ad.id);
				});

				googletag.pubads().enableSingleRequest();
				googletag.enableServices();
			});

			// googletag.cmd.push(function () {
			// 	googletag.display(ad.id);
			// });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};
