import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

declare const window: any;

export const useAds = () => {
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

	return changing;
};
