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
