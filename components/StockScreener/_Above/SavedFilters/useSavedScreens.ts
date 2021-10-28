import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useUserInfo } from 'hooks/useUserInfo';
import { getData } from 'functions/API';
import { screenerState } from 'components/StockScreener/screener.state';
import { useEffect, useState } from 'react';
import { FilterId } from 'components/StockScreener/screener.types';

// Fetch saved screens
async function fs(
	email: string | null,
	token: string | null,
	type: 'stocks' | 'ipo'
) {
	if (!email || !token) return null;
	return await getData(
		`screener-settings?uid=${email}&t=${token}&type=${type}&action=list`
	);
}

type SavedFilter = {
	id: FilterId;
	value: string;
};

export function useSavedScreens(type: 'stocks' | 'ipo') {
	const filters = screenerState((state) => state.filters);
	const [save, setSave] = useState<SavedFilter[]>([]);
	const [msg, setMsg] = useState('');
	const [err, setErr] = useState('');
	const { email, token } = useUserInfo();
	const queryClient = useQueryClient();

	const api = process.env.NEXT_PUBLIC_API_URL;

	useEffect(() => {
		const newF = filters.map((filter) => {
			return { id: filter.id, value: filter.value };
		});

		setSave(newF);
	}, [filters]);

	function clearMessages() {
		setMsg('');
		setErr('');
	}

	async function post(action: string, name: string) {
		clearMessages();

		try {
			const res = await axios.post(api + '/screener-settings', {
				email,
				token,
				type,
				action,
				name,
				filters: save,
			});

			if (res.status === 200) {
				setMsg('Success: ' + res?.data?.message);
				setTimeout(() => {
					clearMessages();
				}, 5000);
			}
		} catch (error: any) {
			setErr('Error: ' + error?.response?.data?.message);
		}
	}

	const { status, data, error } = useQuery(
		['screener', email, type],
		() => fs(email, token, type),
		{
			refetchOnWindowFocus: true,
		}
	);

	const add = useMutation((name: string) => post('add', name), {
		onSuccess: () => {
			queryClient.invalidateQueries('screener');
		},
	});

	const del = useMutation((name: string) => post('remove', name), {
		onSuccess: () => {
			queryClient.invalidateQueries('screener');
		},
	});

	return {
		status,
		data,
		error,
		add,
		del,
		msg,
		setMsg,
		err,
		setErr,
		clearMessages,
	};
}
