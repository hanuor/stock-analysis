import { useEffect, useState } from 'react';
import Script from 'next/script';
import { navState } from 'state/navState';
import { PathType } from 'types/Path';

declare global {
	// eslint-disable-next-line no-unused-vars
	interface Window {
		adngin: any;
	}
}

function getPageAds(path: PathType) {
	if (path.one === 'ipos') {
		if (path.two === 'statistics') {
			return ['sidebar_1'];
		}
		return ['sidebar_1', 'sidebar_2'];
	} else if (path.one !== 'stocks' && path.one !== 'etf') {
		return ['sidebar_1'];
	}
	return [];
}

export function LoadAds() {
	const [ads, setAds] = useState<string[]>([]);
	const path = navState((state) => state.path);

	useEffect(() => {
		const adsArray = getPageAds(path);

		setAds(adsArray);
		if (
			adsArray.length > 0 &&
			window.adngin &&
			window.adngin.adnginLoaderReady
		) {
			window.adngin.queue.push(function () {
				window.adngin.cmd.startAuction(adsArray);
			});
		}
	}, [path]);

	if (ads.length === 0) {
		return null;
	}

	return (
		<>
			<Script
				id="snigel-initial-ads"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `window.snigelPubConf = { "adengine": { "activeAdUnits": ${JSON.stringify(
						ads
					)} } }`,
				}}
			/>
			<Script
				id="snigel-script"
				strategy="afterInteractive"
				src="https://cdn.snigelweb.com/adengine/stockanalysis.com/loader.js"
			/>
		</>
	);
}
