import { useEffect } from 'react';
import { navState } from 'state/navState';

export const useScript = (url: string) => {
	const path = navState((state) => state.path);

	useEffect(() => {
		if (path.two === 'gm') {
			return;
		}
		const script = document.createElement('script');

		script.src = url;
		script.async = true;

		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, [path.two, url]);
};
