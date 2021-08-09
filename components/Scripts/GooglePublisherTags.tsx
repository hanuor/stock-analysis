import { navState } from 'state/navState';
import Script from 'next/script';

const Sidebar1 = `var mappingA = googletag.sizeMapping().addSize([1024, 0], [[336, 280],[300, 250]]).addSize([0, 0], []).build();googletag.defineSlot('/2507246/SAN//stockanalysis//misc//1', [300, 250], 'div-gpt-ad-1617185412139-0').defineSizeMapping(mappingA).addService(googletag.pubads());`;

export const GooglePublisherTags = () => {
	const path = navState((state) => state.path);

	if (path.one === 'privacy-policy') {
		return null;
	}

	let ads: string[] = [];

	if (path.one === 'stocks' || path.one === 'etf') {
		if (!path.three && path.two === 'gm') {
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

	if (ads.length === 0) {
		return null;
	}

	return (
		<>
			<Script
				strategy="lazyOnload"
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
					window.googletag = window.googletag || {cmd: []};googletag.cmd.push(function() {
						${ads.includes('sidebar_1') && Sidebar1}
						googletag.pubads().enableSingleRequest();googletag.enableServices();});
						`,
				}}
			/>
		</>
	);
};

// googletag.pubads().disableInitialLoad();
