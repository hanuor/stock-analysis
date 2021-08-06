import { authState } from 'state/authState';

export const Logout = ({ setOpen }: { setOpen?: (open: boolean) => void }) => {
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

		setOpen && setOpen(false);

		try {
			await fetch(
				`https://api.stockanalysis.com/wp-json/authorize/v1/auth/revoke?JWT=${token}`,
				{ method: 'POST' }
			);
		} catch (err) {
			console.log({ err });
		}
	}

	return (
		<span
			onClick={() => handleLogout()}
			className="block lg:inline cursor-pointer py-2 px-3 "
		>
			Log Out
		</span>
	);
};
