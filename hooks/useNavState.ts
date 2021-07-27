import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { navState } from 'state/navState';

// Validate that the URL piece is a valid route
const validate = (bit: string) => {
	if (!bit) {
		return null;
	}

	if (
		bit.charAt(0) !== '#' &&
		bit.charAt(0) !== '?' &&
		bit.charAt(0) !== '%'
	) {
		return bit;
	}

	return null;
};

export const useNavState = () => {
	const router = useRouter();
	const path = navState((state) => state.path);
	const setPath = navState((state) => state.setPath);

	useEffect(() => {
		const route = router.asPath;
		const split = route.split('/');
		const one = validate(split[1]);
		const two = validate(split[2]);
		const three = validate(split[3]);
		const four = validate(split[4]);

		setPath({
			one,
			two,
			three,
			four,
		});
	}, [router.asPath, setPath]);

	return path;
};
