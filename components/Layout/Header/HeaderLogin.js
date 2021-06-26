import useUserInfo from '@Firebase/useUserInfo';
import Link from 'next/link';

export default function HeaderLogin() {
	const user = useUserInfo();

	const LogInOut = () => {
		if (!user) {
			return (
				<Link href="/login/">
					<a>Log In</a>
				</Link>
			);
		} else {
			return (
				<Link href="/login/">
					<a>Log Out</a>
				</Link>
			);
		}
	};

	const TrialOrAccount = () => {
		if (!user) {
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
