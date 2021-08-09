import { useEffect } from 'react';

export const useAd = () => {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const googletag = window.googletag || {};
			googletag.cmd = googletag.cmd || [];

			googletag.cmd.push(function () {
				// Sidebar 1 -- sizes
				const mappingA = googletag
					.sizeMapping()
					.addSize(
						[1024, 0],
						[
							[336, 280],
							[300, 250],
						]
					)
					.addSize([0, 0], [])
					.build();

				// Sidebar 1 -- slot
				googletag
					.defineSlot(
						'/2507246/SAN//stockanalysis//misc//1',
						[300, 250],
						'div-gpt-ad-1617185412139-0'
					)
					.defineSizeMapping(mappingA)
					.addService(googletag.pubads());

				googletag.pubads().enableSingleRequest();
				googletag.enableServices();
			});

			googletag.cmd.push(function () {
				googletag.display('div-gpt-ad-1617185412139-0');
			});
		}
	}, []);
};
