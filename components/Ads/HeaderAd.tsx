import { useAd } from 'hooks/useAd';

const headerAd = (googletag: any) => {
	const mappingB = googletag
		.sizeMapping()
		.addSize([768, 0], [728, 90])
		.addSize([0, 0], [])
		.build();

	// Sidebar 1 -- slot
	googletag
		.defineSlot(
			'/2507246/SAN//stockanalysis//misc//2',
			[728, 90],
			'div-gpt-ad-1617185422059-0'
		)
		.defineSizeMapping(mappingB)
		.addService(googletag.pubads());
};

export const HeaderAd = () => {
	useAd('HeaderAd', headerAd, 'div-gpt-ad-1617185412139-0');

	return (
		<>
			<div
				className="hidden md:block md:h-[90px] md:w-[728px] bg-gray-50 mx-auto"
				id="div-gpt-ad-1617185422059-0"
			></div>
		</>
	);
};
