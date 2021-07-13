import { FC } from 'react';
import { authState } from 'state/authState';
import Axios from 'axios';

export const Logout: FC = () => {
	const setIsLoggedIn = authState((state) => state.setIsLoggedIn);
	const setIsPro = authState((state) => state.setIsPro);
	const setEmail = authState((state) => state.setEmail);
	const setAvatar = authState((state) => state.setAvatar);

	async function handleLogout() {
		const token = localStorage.getItem('auth');
		localStorage.removeItem('email');
		localStorage.removeItem('auth');
		localStorage.removeItem('avatar');
		setIsLoggedIn(false);
		setIsPro(false);
		setEmail(null);
		setAvatar(null);

		try {
			await Axios.post(
				`https://stockanalysis17jun2.local/wp-json/authorize/v1/auth/revoke?JWT=${token}`
			);
		} catch (err) {
			console.log({ err });
		}
	}

	return (
		<span onClick={() => handleLogout()} className="cursor-pointer">
			Log Out
		</span>
	);
};
