import { useEffect } from 'react';
import { authState } from 'state/authState';

export function useUserInfo() {
	const email = authState((state) => state.email);
	const setEmail = authState((state) => state.setEmail);
	const isLoggedIn = authState((state) => state.isLoggedIn);
	const setIsLoggedIn = authState((state) => state.setIsLoggedIn);
	const isPro = authState((state) => state.isPro);
	const setIsPro = authState((state) => state.setIsPro);
	const setAvatar = authState((state) => state.setAvatar);

	useEffect(() => {
		async function checkAuth(
			token: string | null,
			email: string | null,
			hasAvatar: boolean
		) {
			try {
				const response = await fetch(
					`https://stockanalysis.com/wp-json/authorize/v1/autologin?JWT=${token}&e=${email}&a=${hasAvatar}`
				);

				if (response.ok) {
					const data = await response.json();

					if (data.message === 'User was logged in.') {
						setIsLoggedIn(true);
						setEmail(data.e);
						setIsPro(data.p);

						if (data.a) {
							localStorage.setItem('avatar', data.a);
						}
					} else {
						setIsLoggedIn(false);
						setIsPro(false);
						setAvatar('');
					}
				} else {
					throw new Error('Network response not ok.');
				}
			} catch (error) {
				console.error(error);
			}
		}

		const email = localStorage.getItem('email');
		const avatar = localStorage.getItem('avatar');
		const hasAvatar = avatar ? true : false;
		const token = localStorage.getItem('auth');

		if (email) {
			setEmail(email);
		}

		if (avatar) {
			setAvatar(avatar);
		}

		if (token) {
			checkAuth(token, email, hasAvatar);
		}
	}, [isLoggedIn, setAvatar, setEmail, setIsLoggedIn, setIsPro]);

	return { email, isLoggedIn, setIsLoggedIn, isPro, setIsPro };
}
