import { useEffect } from 'react';
import { authState } from 'state/authState';

export function useUserInfo() {
	const email = authState((state) => state.email);
	const setEmail = authState((state) => state.setEmail);
	const isLoggedIn = authState((state) => state.isLoggedIn);
	const setIsLoggedIn = authState((state) => state.setIsLoggedIn);
	const isPro = authState((state) => state.isPro);
	const setIsPro = authState((state) => state.setIsPro);
	const status = authState((state) => state.status);
	const setStatus = authState((state) => state.setStatus);

	useEffect(() => {
		async function checkAuth(token: string | null, email: string | null) {
			try {
				setStatus('loading');
				const response = await fetch(
					`https://stockanalysis.com/wp-json/authorize/v1/autologin?JWT=${token}&e=${email}`
				);

				if (response.ok) {
					const data = await response.json();

					if (data.message === 'User was logged in.') {
						setIsLoggedIn(true);
						setEmail(data.e);
						setIsPro(data.p);
					} else {
						setIsLoggedIn(false);
						setIsPro(false);
					}
				} else {
					throw new Error('Network response not ok.');
				}
			} catch (error) {
				console.error(error);
			} finally {
				setStatus('completed');
			}
		}

		const email = localStorage.getItem('email');
		const token = localStorage.getItem('auth');

		if (email) {
			setEmail(email);
		}

		if (token && status === 'unchecked') {
			checkAuth(token, email);
		} else {
			setStatus('completed');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { email, isLoggedIn, setIsLoggedIn, isPro, setIsPro, status };
}
