import { useAd } from 'hooks/useAd';
import { authState } from 'state/authState';

export const Mobile1 = () => {
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);

	useAd('mobile1');

	if (status === 'completed' && isPro) {
		return null;
	}

	return (
		<div className="block xsm:hidden lbl mt-4 -mb-1">
			<div
				className={`block xsm:hidden min-h-[250px] text-center mx-auto${
					process.env.NODE_ENV === 'development' ? ' bg-gray-100' : ''
				}`}
				id="div-gpt-ad-1617185437543-0"
			></div>
		</div>
	);
};
