import { authState } from 'state/authState';

declare global {
	// eslint-disable-next-line no-unused-vars
	interface Window {
		__tcfapi: any;
	}
}

export const ChangeConsent = () => {
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);

	if (status === 'completed' && isPro) {
		return null;
	}

	if (
		typeof window === 'undefined' ||
		process.env.NODE_ENV === 'development'
	) {
		return null;
	}

	return (
		<>
			<p>
				If you want to change your ad consent preferences, click this button
				to customize your settings:
			</p>
			<button
				className="px-4 py-2 border border-transparent text-lg font-medium rounded-sm shadow-sm text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-5"
				onClick={window.__tcfapi('displayConsentUi', 2, function () {})}
			>
				Change Consent
			</button>
		</>
	);
};
