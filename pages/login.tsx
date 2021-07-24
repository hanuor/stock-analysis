/* eslint-disable @next/next/no-img-element */
import { LayoutFullWidth } from 'components/Layout/LayoutFullWidth';
import { SEO } from 'components/SEO';
import { HeaderLogo } from 'components/Layout/Header/HeaderLogo';
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
	const [remember, setRemember] = useState(true);
	const router = useRouter();

	async function handleSubmit(
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		e.preventDefault();

		try {
			setError('');
			const res = await Axios.post(
				'https://stockanalysis.com/wp-json/authorize/v1/auth',
				{
					email: email,
					password: password,
				}
			);

			setIsLoggedIn(true);

			if (remember) {
				localStorage.setItem('email', email);
				localStorage.setItem('auth', res.data.data.jwt);
			}

			router.push('/');
		} catch (error) {
			const msg = error.response.data.data.message;

			switch (msg) {
				case 'Wrong user credentials.':
					setError('Incorrect email or password.');
					break;

				default:
					setError(msg);
					break;
			}
		}
	}

	if (isLoggedIn) {
		return (
			<>
				<SEO title="Log in to Stock Analysis" canonical="login/" />
				<LayoutFullWidth>
					<div className="bg-gray-50 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
						<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
							<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
								<Link href="/" prefetch={false}>
									<a>
										<HeaderLogo className="h-28 w-28 mx-auto mb-8" />
									</a>
								</Link>
								<h1 className="mt-6 text-center text-3xl font-bold text-gray-900">
									You are already logged in
								</h1>
								<p className="mt-2 text-center font-medium text-base text-gray-600 mb-10">
									Go to{' '}
									<Link href="/my-account/" prefetch={false}>
										<a className="bll">my account.</a>
									</Link>
								</p>
								<button
									type="submit"
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
								>
									<Logout />
								</button>
							</div>
						</div>
					</div>
				</LayoutFullWidth>
			</>
		);
	}

	return (
		<>
			<SEO title="Log in to Stock Analysis" canonical="login/" />
			<LayoutFullWidth>
				<div className="bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
					<div className="sm:mx-auto sm:w-full sm:max-w-md">
						<Link href="/" prefetch={false}>
							<a>
								<HeaderLogo className="h-28 w-28 mx-auto mb-8" />
							</a>
						</Link>
						<h1 className="mt-6 text-center text-3xl font-bold text-gray-900">
							Log in to your account
						</h1>
						<p className="mt-2 text-center font-medium text-smaller text-gray-600">
							Or{' '}
							<Link href="/pro/" prefetch={false}>
								<a className="bll">start your free 30-day trial</a>
							</Link>
						</p>
					</div>

					<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
						<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
							{error && (
								<div className="border border-red-300 bg-red-50 p-2 mb-4 rounded-md">
									Error: {error}
								</div>
							)}
							<form className="space-y-6" onSubmit={handleSubmit}>
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium text-gray-700"
									>
										Email address
									</label>
									<div className="mt-1">
										<input
											id="email"
											name="email"
											type="email"
											autoComplete="email"
											required
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
											value={email || ''}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
								</div>

								<div>
									<label
										htmlFor="password"
										className="block text-sm font-medium text-gray-700"
									>
										Password
									</label>
									<div className="mt-1">
										<input
											id="password"
											name="password"
											type="password"
											autoComplete="current-password"
											required
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
											value={password || ''}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</div>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex items-center">
										<input
											id="remember-me"
											name="remember-me"
											type="checkbox"
											className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
											checked={remember}
											onChange={() => setRemember(!remember)}
										/>
										<label
											htmlFor="remember-me"
											className="ml-2 block text-sm text-gray-900"
										>
											Remember me
										</label>
									</div>

									<div className="text-sm">
										<a
											href="https://stockanalysis.com/pro-login/?action=lostpassword"
											className="font-medium bll"
										>
											Forgot your password?
										</a>
									</div>
								</div>

								<div>
									<button
										type="submit"
										className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
									>
										Log in
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</LayoutFullWidth>
		</>
	);
}
