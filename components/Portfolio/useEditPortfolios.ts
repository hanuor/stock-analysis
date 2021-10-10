import axios from 'axios';
import { useUserInfo } from 'hooks/useUserInfo';
import { useMutation, useQueryClient } from 'react-query';

export function useEditPortfolios() {
	const { email, token } = useUserInfo();
	const queryClient = useQueryClient();

	async function post(action: string, item: string) {
		const url = process.env.NEXT_PUBLIC_API_URL + '/portfolio';
		return await axios.post(url, {
			email,
			token,
			action,
			item,
		});
	}

	function invalidate() {
		queryClient.invalidateQueries('portfolios');
	}

	const add = useMutation(
		(name: string) => {
			return post('add_portfolio', name);
		},
		{
			onSuccess: invalidate,
		}
	);

	return { add };
}
