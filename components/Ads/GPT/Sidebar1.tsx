import { authState } from 'state/authState';
import { navState } from 'state/navState';

export const Sidebar1 = () => {
	const path = navState((state) => state.path);
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);

	if (status === 'completed' && isPro) {
		return null;
	}

	if (path.one === 'privacy-policy' || path.one === 'terms-of-use') {
		return null;
	}

	return (
		<>
			{/* prettier-ignore */}
			<div className="min-h-[250px] mt-3"><div className="dianomi_context" data-dianomi-context-id="420"></div></div>
		</>
	);
};
