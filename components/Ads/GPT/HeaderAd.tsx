import { authState } from 'state/authState';
import { navState } from 'state/navState';

export const HeaderAd = () => {
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);
	const path = navState((state) => state.path);

	if (
		(status === 'completed' && isPro) ||
		path.one === 'login' ||
		path.one === 'my-account' ||
		path.one === 'pro' ||
		path.one === 'subscribe' ||
		path.one === 'privacy-policy' ||
		path.one === 'terms-of-use'
	) {
		return null;
	}

	const hwrap =
		path.one !== null
			? 'hidden md:block lbl py-1.5 -mb-3'
			: 'hidden md:block lbl py-1.5 -mb-3 bg-gray-100';

	return (
		<div className={hwrap}>
			<div
				className={`md:h-[90px] md:w-[728px] mx-auto${
					process.env.NODE_ENV === 'development' ? ' bg-gray-200' : ''
				}`}
				id="div-gpt-ad-1617185422059-0"
			></div>
		</div>
	);
};
