import { useEffect } from 'react';
import { useNavigating } from 'hooks/useAdReload';
import { Ads } from 'components/Ads/AdsList';

export const useAd = (unit, render, id) => {
	const isNavigating = useNavigating();
	const ad = Ads[unit];

	useEffect(() => {
		if (typeof window !== 'undefined' && googletag && !isNavigating) {
			googletag.cmd.push(function () {
				const mapping = ad.mapping;
				const adMapping = googletag.sizeMapping();
				Object.keys(mapping).forEach((breakpoint) => {
					adMapping.addSize([Number(breakpoint), 0], mapping[breakpoint]);
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

				googletag.pubads().enableSingleRequest();
				googletag.enableServices();
			});

			googletag.cmd.push(function () {
				googletag.display(ad.id);
			});
		}
	}, [ad.id, ad.mapping, ad.number, ad.sizes, id, isNavigating, render]);
};
