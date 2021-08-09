import { navState } from 'state/navState';

export const Sidebar1 = () => {
	const path = navState((state) => state.path);

	if (!path.one || path.one !== 'stocks') {
		return null;
	}

	return (
		<>
			<div className="lbl mt-4 mb-1">
				<div
					className="min-h-[250px] w-[300px] bg-gray-50 mx-auto"
					id="div-gpt-ad-1617185412139-0"
				></div>
			</div>
		</>
	);
};
