import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { navState } from 'state/navState';
// import { useAds } from 'hooks/useAds';
import Script from 'next/script';

const Sidebar1 = `var mappingA = googletag.sizeMapping().addSize([1024, 0], [[336, 280],[300, 250]]).addSize([0, 0], []).build();googletag.defineSlot('/2507246/SAN//stockanalysis//misc//1', [300, 250], 'div-gpt-ad-1617185412139-0').defineSizeMapping(mappingA).addService(googletag.pubads());`;

declare const window: any;

export const GooglePublisherTags = () => {
	// const changing = useAds();
	const path = navState((state) => state.path);
	const router = useRouter();
	const [changing, setChanging] = useState(false);

	const navStart = () => {
		setChanging(true);
		console.log('navStart');

		// destroy all ad slots
		const { googletag } = window;
		googletag.cmd.push(function () {
			googletag.destroySlots();
		});
	};

	const navEnd = () => {
		setChanging(false);
		console.log('navEnd');
	};

	useEffect(() => {
		router.events.on('routeChangeStart', navStart);
		router.events.on('routeChangeComplete', navEnd);

		return () => {
			router.events.off('routeChangeStart', navStart);
			router.events.off('routeChangeComplete', navEnd);
		};
	}, [router]);

	console.log(changing);

	// if (path.one === 'privacy-policy') {
	// 	return null;
	// }

	let ads: string[] = [];

	if (path.one === 'stocks' || path.one === 'etf') {
		if (!path.three) {
			ads = ['sidebar_1'];
		} else if (path.three && ['holdings', 'dividend'].includes(path.three)) {
			ads = [];
		} else if (path.three && ['financials', 'chart'].includes(path.three)) {
			ads = [];
		} else {
			ads = [];
		}
	} else if (path.one === 'ipos') {
		ads = [];
	} else if (path.one === '') {
		ads = [];
	}

	// if (ads.length === 0) {
	// 	return null;
	// }

	console.log({ path });
	console.log({ ads });

	return (
		<>
			<Script
				strategy="afterInteractive"
				src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
			/>
			{/* <Script
				strategy="lazyOnload"
				src="https://biddr.brealtime.com/91455193-1695.js"
			/> */}
			<Script
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
					window.googletag = window.googletag || {cmd: []};
					googletag.cmd.push(function() {
						${ads.includes('sidebar_1') && Sidebar1}
						googletag.pubads().enableSingleRequest();
						googletag.enableServices();
					});
						`,
				}}
			/>
		</>
	);
};

// googletag.pubads().disableInitialLoad();
