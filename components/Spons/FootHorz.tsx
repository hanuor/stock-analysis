import Script from 'next/script';
import { navState } from 'state/navState';
import { authState } from 'state/authState';

// Dianomi ad in the footer
export const FooterDianomi = () => {
	const path = navState((state) => state.path);
	const isLoggedIn = authState((state) => state.isLoggedIn);
	const isPro = authState((state) => state.isPro);
	const status = authState((state) => state.status);

	console.log(status);
	console.log(isPro);

	if (
		status === 'completed' &&
		!isPro &&
		!isLoggedIn &&
		path.one !== 'login' &&
		path.one !== 'pro' &&
		path.one !== 'contact' &&
		path.one !== 'privacy-policy' &&
		path.one !== 'terms-of-use'
	) {
		return (
			<>
				<Script
					src="https://www.dianomi.com/js/contextfeed.js"
					strategy="lazyOnload"
				/>
				<div className="max-w-[970px] min-h-[250px] mx-auto my-8">
					<div
						className="dianomi_context"
						data-dianomi-context-id="443"
					></div>
				</div>
			</>
		);
	}

	return null;
};
export default FooterDianomi;
