import { authState } from 'state/authState';
import { navState } from 'state/navState';

// Dianomi ad in the footer
export const FooterDianomi = () => {
	const path = navState((state) => state.path);
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);

	if (status === 'completed' && isPro) {
		return null;
	}

	if (
		path.one !== 'login' &&
		path.one !== 'pro' &&
		path.one !== 'contact' &&
		path.one !== 'privacy-policy' &&
		path.one !== 'terms-of-use' &&
		path.one !== 'subscribe'
	) {
		return (
			<>
				{/* prettier-ignore */}
				<div className="max-w-[970px] min-h-[250px] mx-auto my-9 px-3 xs:px-4 lg:px-0"><div className="dianomi_context" data-dianomi-context-id="443"></div></div>
			</>
		);
	}

	return null;
};
export default FooterDianomi;
