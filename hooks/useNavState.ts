import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { navState } from 'state/navState';

export const useNavState = () => {
	const router = useRouter();
	const path = navState((state) => state.path);
	const setPath = navState((state) => state.setPath);

	useEffect(() => {
		const route = router.asPath;
		const split = route.split('/');
		const one = split[1] || null;
		const two = split[2] || null;
		const three = split[3] || null;
		const four = split[4] || null;

		setPath({
			one,
			two,
			three,
			four,
		});
	}, [router.asPath, setPath]);

	return path;
};
