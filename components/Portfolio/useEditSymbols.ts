import axios from 'axios';
import { useUserInfo } from 'hooks/useUserInfo';
import { useMutation } from 'react-query';

export function useEditSymbols() {
	const { email, token } = useUserInfo();

	const add = useMutation((symbol: string) => {
		return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/portfolio`, {
			email: email,
			token: token,
			action: 'add_symbol',
			item: symbol,
		});
	});

	return { add };
}
