import { useAd } from 'hooks/useAd';

export const HeaderAd = () => {
	useAd('header');

	return (
		<>
			<div className="hidden md:block lbl mt-2">
				<div
					className="md:h-[90px] md:w-[728px] bg-gray-50 mx-auto"
					id="div-gpt-ad-1617185422059-0"
				></div>
			</div>
		</>
	);
};
