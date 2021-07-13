import UserLayout from 'components/Layout/UserLayout';
import { SEO } from 'components/SEO';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUserInfo } from 'hooks/useUserInfo';
import { Logout } from 'components/Logout';
import Axios from 'axios';

export default function Login() {
	const { isLoggedIn, setIsLoggedIn } = useUserInfo();
	const [error, setError] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	async function handleSubmit(
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		e.preventDefault();

		try {
			const res = await Axios.post(
				'https://stockanalysis17jun2.local/wp-json/authorize/v1/auth',
				{
					email: email,
					password: password,
				}
			);

			if (res.status === 200 && res.data.success) {
				localStorage.setItem('email', email);
				localStorage.setItem('auth', res.data.data.jwt);
				setIsLoggedIn(true);
				router.push('/');
			} else {
				console.error(res);
				setError(
					'There was an error, please try again or contact customer support.'
				);
			}
		} catch (err) {
			console.log({ err });
			setError(err);
		}
	}

	const PageSeo = () => (
		<SEO title="Log in to Stock Analysis" canonical="login/" />
	);

	if (isLoggedIn) {
		return (
			<>
				<PageSeo />
				<UserLayout>
					<h1 className="hh1">You are logged in</h1>
					<div className="mb-2">Email:</div>
					<button className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-lg font-medium rounded-sm shadow-sm text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
						<Logout />
					</button>
				</UserLayout>
			</>
		);
	}

	return (
		<>
			<PageSeo />
			<UserLayout>
				<h1 className="text-3xl xs:text-4xl font-bold mb-5 text-gray-800">
					Log in to Stock Analysis
				</h1>
				<form onSubmit={handleSubmit}>
					<div className="my-10 space-y-6 max-w-md mx-auto">
						{error && (
							<div className="border border-red-300 bg-red-50 p-2">
								Error: {error}
							</div>
						)}

						<input
							type="email"
							autoComplete="username"
							placeholder="Email"
							className="block w-full rounded-md"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type="password"
							autoComplete="new-password"
							placeholder="Choose Password"
							className="block w-full rounded-md"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<div>
							<button className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-lg font-medium rounded-sm shadow-sm text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
								Log In
							</button>
							<div className="mt-2">
								<a
									href="https://stockanalysis.com/pro-login/?action=lostpassword"
									className="bll"
								>
									Forgot Password?
								</a>
							</div>
						</div>
					</div>
				</form>
				Need an account?{' '}
				<Link href="/pro/" prefetch={false}>
					<a className="bll">Sign up here</a>
				</Link>
			</UserLayout>
		</>
	);
}
