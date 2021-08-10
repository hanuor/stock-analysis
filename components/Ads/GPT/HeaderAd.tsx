import { useAd } from 'hooks/useAd';
import { navState } from 'state/navState';

export const HeaderAd = () => {
	useAd('header');
	const path = navState((state) => state.path);

	const wrapStyles = !path.one
		? 'hidden md:block lbl pt-2 bg-gray-100'
		: 'hidden md:block lbl mt-2';

	return (
		<>
			<div className={wrapStyles}>
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
