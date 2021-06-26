import useUserInfo from '@Firebase/useUserInfo';
import UserLayout from '@/Layout/UserLayout';
import Link from 'next/link';

export default function MyAccount() {
	const user = useUserInfo();

	return (
		<UserLayout title="My Account">
			<div className="">
				{user ? (
					<>
						<h1 className="text-3xl xs:text-5xl font-bold mb-5 text-gray-800">
							My Account
						</h1>
						<div>Email: {user.email}</div>
					</>
				) : (
					<div className="space-y-3 text-lg">
						<p>This page is only available for logged in users.</p>
						<p>
							If you have an account already,{' '}
							<Link href="/login/">
								<a className="bll">login here</a>
							</Link>
							.
						</p>
						<p>
							If not, then you can{' '}
							<Link href="/pro/">
								<a className="bll">sign up here</a>
							</Link>
							.
						</p>
					</div>
				)}
			</div>
		</UserLayout>
	);
}
