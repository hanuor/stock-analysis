import { getAuth, signOut } from 'firebase/auth';

export const SignOut = () => {
	const auth = getAuth();

	function handleLogout() {
		signOut(auth)
			.then(() => {
				console.log('Logged out successfully');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log({ errorCode });
				console.log({ errorMessage });
			});
	}

	return (
		<span onClick={() => handleLogout()} className="cursor-pointer">
			Log Out
		</span>
	);
};

export default SignOut;
