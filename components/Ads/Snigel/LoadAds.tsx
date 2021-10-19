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
	// Front page
	if (!path.one) {
		return ['top_leaderboard'];
	}

	// IPO pages
	if (path.one === 'ipos') {
		if (path.two === 'statistics') {
			return ['top_leaderboard', 'sidebar_1'];
		}
		return ['top_leaderboard', 'sidebar_1', 'sidebar_2'];
	}

	// News and Actions pages
	if (path.one === 'news' || path.one === 'actions') {
		return ['top_leaderboard', 'sidebar_1', 'sidebar_2'];
	}

	// Stocks and ETF pages
	if ((path.one === 'stocks' || path.one === 'etf')) {
		// Index pages
		if (!path.two) {
			return ['top_leaderboard', 'sidebar_1', 'sidebar_2'];
		}
		// Overview pages
		if (!path.three) {
			return ['top_leaderboard', 'sidebar_1'];
		}
		// Holdings, Dividend, Statistics and Company pages
		if (path.three === 'holdings' || path.three === 'dividend' || path.three === 'statistics' || path.three === 'company') {
			return ['top_leaderboard', 'sidebar_1', 'sidebar_2'];
		}
	}

	// Mostly article pages
	if (path.one !== 'stocks' && path.one !== 'etf') {
		return ['top_leaderboard', 'sidebar_1', 'sidebar_2'];
	}

	// Default
	return ['top_leaderboard'];
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

	if (
		typeof window === 'undefined' ||
		process.env.NODE_ENV === 'development'
	) {
		return null;
	}

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