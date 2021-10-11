import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useUserInfo } from 'hooks/useUserInfo';
import { getData } from 'functions/API';

export function usePortfolioList() {
	const { email, token } = useUserInfo();
	const queryClient = useQueryClient();

	const api = axios.create({
		baseURL: process.env.NEXT_PUBLIC_API_URL,
	});

	async function fetchList() {
		if (!email || !token) return null;
		return await getData(`portfolio?uid=${email}&t=${token}&action=list`);
	}

	async function post(action: string, item: string) {
		return await api.post('/portfolio', {
			email,
			token,
			action,
			item,
		});
	}

	const { status, data, error } = useQuery(['portfolios', email], () => fetchList(), {
		refetchOnWindowFocus: true,
	});

	const add = useMutation((item: string) => post('add_portfolio', item), {
		onSuccess: () => queryClient.invalidateQueries('portfolios'),
	});

	const remove = useMutation((item: string) => post('remove_portfolio', item), {
		onSuccess: () => queryClient.invalidateQueries('portfolios'),
	});

	return { add, remove, status, data, error };
}
