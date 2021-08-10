import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useNavigating = () => {
	const router = useRouter();
	const [isNavigating, setIsNavigating] = useState(false);

	const changeStart = () => {
		setIsNavigating(true);
		googletag.cmd.push(function () {
			googletag.destroySlots();
		});
	};

	const changeEnd = () => {
		setIsNavigating(false);
	};

	useEffect(() => {
		router.events.on('routeChangeStart', changeStart);
		router.events.on('routeChangeComplete', changeEnd);

		return () => {
			router.events.off('routeChangeStart', changeStart);
			router.events.off('routeChangeComplete', changeEnd);
		};
	}, [router.events]);

	return isNavigating;
};
