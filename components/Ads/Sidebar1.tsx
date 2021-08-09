import { useAd } from 'hooks/useAd';

const sidebar1 = (googletag: any) => {
	const mappingA = googletag
		.sizeMapping()
		.addSize(
			[1024, 0],
			[
				[336, 280],
				[300, 250],
			]
		)
		.addSize([0, 0], [])
		.build();

	// Sidebar 1 -- slot
	googletag
		.defineSlot(
			'/2507246/SAN//stockanalysis//misc//1',
			[300, 250],
			'div-gpt-ad-1617185412139-0'
		)
		.defineSizeMapping(mappingA)
		.addService(googletag.pubads());
};

export const Sidebar1 = () => {
	useAd('Sidebar1', sidebar1, 'div-gpt-ad-1617185412139-0');

	return (
		<>
			<div
				className="min-h-[250px] min-w-[300px] bg-gray-50 mx-auto"
				id="div-gpt-ad-1617185412139-0"
			></div>
		</>
	);
};
