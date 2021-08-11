// import { useAd } from 'hooks/useAd';
import { authState } from 'state/authState';

export const Sidebar1 = () => {
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);
	// useAd('sidebar1');

	if (status === 'completed' && isPro) {
		return null;
	}

	return (
		<div className="hidden lg:block lbl mt-4 mb-1">
			<div
				className={`hidden lg:block min-h-[250px] text-center mx-auto${
					process.env.NODE_ENV === 'development' ? ' bg-gray-100' : ''
				}`}
				id="div-gpt-ad-1617185412139-0"
			></div>
		</div>
	);
};
