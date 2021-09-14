import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { navState } from 'state/navState';
import { validateUrlBit } from 'functions/validation';

export const useNavState = () => {
	const router = useRouter();
	const path = navState((state) => state.path);
	const setPath = navState((state) => state.setPath);
	const route = navState((state) => state.route);
	const setRoute = navState((state) => state.setRoute);
	const views = navState((state) => state.views);
	const setViews = navState((state) => state.setViews);

	useEffect(() => {
		const url = router.asPath;
		const split = url.split('/');
		const one = validateUrlBit(split[1]);
		const two = validateUrlBit(split[2]);
		const three = validateUrlBit(split[3]);
		const four = validateUrlBit(split[4]);

		setPath({
			one,
			two,
			three,
			four,
		});

		setRoute(url);
		setViews(views + 1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.asPath]);

	return { path, route, views };
};
