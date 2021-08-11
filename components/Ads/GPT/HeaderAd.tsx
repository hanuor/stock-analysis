import { authState } from 'state/authState';
import { navState } from 'state/navState';
// import { useAd } from 'hooks/useAd';

export const HeaderAd = () => {
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);
	const path = navState((state) => state.path);

	if (
		(status === 'completed' && isPro) ||
		path.one === null ||
		path.one === 'login' ||
		path.one === 'my-account' ||
		path.one === 'pro' ||
		path.one === 'subscribe' ||
		path.one === 'privacy-policy' ||
		path.one === 'terms-of-use'
	) {
		return null;
	}

	return <Unit />;
};

const Unit = () => {
	// useAd('header');
	return (
		<>
			<div className="hidden md:block lbl mt-2 -mb-4">
				<div
					className={`md:h-[90px] md:w-[728px] mx-auto${
						process.env.NODE_ENV === 'development' ? ' bg-gray-200' : ''
					}`}
					id="div-gpt-ad-1617185422059-0"
				></div>
			</div>
		</>
	);
};
