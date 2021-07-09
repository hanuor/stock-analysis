import { FC } from 'react';
import { useProInfo } from '../users/useProInfo';

export const ProInfoLoader: FC = () => {
	const { isPro } = useProInfo();

	if (isPro) {
		return <></>;
	} else {
		return null;
	}
};

export default ProInfoLoader;
