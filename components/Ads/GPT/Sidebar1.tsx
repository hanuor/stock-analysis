import { authState } from 'state/authState';
import { navState } from 'state/navState';
import { useScript } from 'hooks/useScript';

export const Sidebar1 = () => {
	const path = navState((state) => state.path);
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);
	useScript('https://www.dianomi.com/js/contextfeed.js');

	if (status === 'completed' && isPro) {
		return null;
	}

	if (path.one === 'privacy-policy' || path.one === 'terms-of-use') {
		return null;
	}

	return (
		<div className="min-h-[250px] mt-3 mb-1">
			<div className="dianomi_context" data-dianomi-context-id="420"></div>
		</div>
	);
};
