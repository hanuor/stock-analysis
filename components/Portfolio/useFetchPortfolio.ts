import { useQuery } from 'react-query';
import { useUserInfo } from 'hooks/useUserInfo';
import { getData } from 'functions/API';

type Props = {
	email: string | null;
	token: string | null;
	id: string | null;
};

async function performFetch({ email, token, id }: Props) {
	if (!email || !token || !id) {
		return null;
	}
	return await getData(
		`portfolio?uid=${email}&t=${token}&action=fetch&pid=${id}`
	);
}

export function useFetchPortfolio(id: string) {
	const { email, token } = useUserInfo();

	const { status, data, error } = useQuery(
		['portfolio', email, id],
		() => performFetch({ email, token, id }),
		{
			refetchOnWindowFocus: true,
		}
	);

	return { status, data, error };
}
