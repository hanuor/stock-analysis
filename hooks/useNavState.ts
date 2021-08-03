import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { navState } from 'state/navState';
import { validateUrlBit } from 'functions/validation';

export const useNavState = () => {
	const router = useRouter();
	const path = navState((state) => state.path);
	const setPath = navState((state) => state.setPath);

	useEffect(() => {
		const route = router.asPath;
		const split = route.split('/');
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
	}, [router.asPath, setPath]);

	return path;
};
