import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface IPath {
	one: string | null;
	two: string | null;
	three: string | null;
	four: string | null;
}

export const useNavState = () => {
	const router = useRouter();
	const [path, setPath] = useState<IPath>({
		one: '',
		two: '',
		three: '',
		four: '',
	});

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
	}, [router.asPath]);

	console.log(path);
	return path;
};
