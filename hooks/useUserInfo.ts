import { useEffect } from 'react';
import { authState } from 'state/authState';
import Axios from 'axios';

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
				const res = await Axios.get(
					`https://stockanalysis17jun2.local/wp-json/authorize/v1/autologin?JWT=${token}&e=${email}&a=${hasAvatar}`
				);

				if (
					res.status === 200 &&
					res.data.message === 'User was logged in.'
				) {
					setIsLoggedIn(true);
					setEmail(res.data.e);
					setIsPro(res.data.p);
					if (res.data.a) {
						localStorage.setItem('avatar', res.data.a);
					}
				} else {
					setIsLoggedIn(false);
					setIsPro(false);
				}
			} catch (err) {
				console.error({ err });
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
