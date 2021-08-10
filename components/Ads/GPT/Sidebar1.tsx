import { useAd } from 'hooks/useAd';

export const Sidebar1 = () => {
	useAd('sidebar1');

	return (
		<>
			<div
				className={`hidden lg:block min-h-[250px] min-w-[300px] text-center mx-auto${
					process.env.NODE_ENV === 'development' ? ' bg-gray-100' : ''
				}`}
				id="div-gpt-ad-1617185412139-0"
			></div>
		</>
	);
};
