import { useAd } from 'hooks/useAd';

export const Mobile1 = () => {
	useAd('mobile1');

	return (
		<>
			<div
				className={`block xsm:hidden min-h-[250px] min-w-[300px] mx-auto${
					process.env.NODE_ENV === 'development' ? ' bg-gray-100' : ''
				}`}
				id="div-gpt-ad-1617185437543-0"
			>
				mob
			</div>
		</>
	);
};
