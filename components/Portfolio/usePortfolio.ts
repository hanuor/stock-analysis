import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useUserInfo } from 'hooks/useUserInfo';
import { getData } from 'functions/API';

export function usePortfolio(pid: string) {
	const { email, token } = useUserInfo();
	const queryClient = useQueryClient();

	const api = axios.create({
		baseURL: process.env.NEXT_PUBLIC_API_URL,
	});

	async function doFetch() {
		if (!email || !token) return null;
		return await getData(`portfolio?uid=${email}&t=${token}&action=fetch&pid=${pid}`);
	}

	const { status, data, error } = useQuery(['portfolio', email, pid], () => doFetch(), {
		refetchOnWindowFocus: true,
	});

	async function post(action: string, item: string) {
		return await api.post('/portfolio', {
			email,
			token,
			action,
			item,
			pid,
		});
	}

	const add = useMutation((item: string) => post('add_symbol', item), {
		onSuccess: () => queryClient.invalidateQueries('portfolio'),
	});

	const remove = useMutation((item: string) => post('remove_symbol', item), {
		onSuccess: () => queryClient.invalidateQueries('portfolio'),
	});

	return { add, remove, status, data, error };
}
