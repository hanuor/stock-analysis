import { useQuery } from 'react-query';
import { useUserInfo } from 'hooks/useUserInfo';
import { getData } from 'functions/API';

async function performFetchList(email: string | null, token: string | null) {
	if (!email || !token) {
		return null;
	}
	return await getData(`portfolio?uid=${email}&t=${token}&action=list`);
}

export function useFetchPortfolioList() {
	const { email, token } = useUserInfo();

	const { status, data, error } = useQuery(
		['portfolio', email],
		() => performFetchList(email, token),
		{
			refetchOnWindowFocus: true,
		}
	);

	return { status, data, error };
}
