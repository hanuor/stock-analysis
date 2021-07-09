import { getAuth, signOut } from 'firebase/auth';
import { userState } from 'state/userState';
import Link from 'next/link';

export default function HeaderLogin() {
	const auth = getAuth();
	const isLoggedIn = userState((state) => state.isLoggedIn);

	const LogInOut = () => {
		if (!isLoggedIn) {
			return (
				<Link href="/login/" prefetch={false}>
					<a>Log In</a>
				</Link>
			);
		} else {
			return (
				<span onClick={() => handleLogout()} className="cursor-pointer">
					Log Out
				</span>
			);
		}
	};

	const TrialOrAccount = () => {
		if (!isLoggedIn) {
			return (
				<Link href="/pro/" prefetch={false}>
					<a>Free Trial</a>
				</Link>
			);
		} else {
			return (
				<Link href="/pro/my-account/" prefetch={false}>
					<a>My Account</a>
				</Link>
			);
		}
	};

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
		<div className="flex flex-row text-center font-semibold lg:block lg:space-x-1 text-lg">
			<span className="flex-1 py-2 px-3 text-white bg-gray-500 lg:flex-none lg:bg-white lg:text-black lg:font-normal hover:text-blue-700">
				<LogInOut />
			</span>
			<span className="flex-1 py-2 px-4 bg-blue-brand_light lg:py-[0.4rem] lg:flex-none lg:px-3 text-white lg:rounded-sm lg:font-normal hover:bg-blue-brand_sharp">
				<TrialOrAccount />
			</span>
		</div>
	);
}
