import UserLayout from '@/Layout/UserLayout';
import { auth } from '@Firebase/firebase';
import { useState, useRef } from 'react';
import Link from 'next/link';
import useUserInfo from '@Firebase/useUserInfo';

export default function Login() {
	const user = useUserInfo();
	const [error, setError] = useState('');
	const inputEmail = useRef();
	const password = useRef();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			await auth
				.signInWithEmailAndPassword(
					inputEmail.current.value,
					password.current.value
				)
				.catch((err) => {
					setError(err.message);
				});
		} catch {
			console.log('Failed to log in');
		}
	}

	if (user) {
		return (
			<UserLayout>
				<h1 className="hh1">You are logged in</h1>
				<div className="mb-2">Email: {user.email}</div>
				<button
					onClick={() => auth.signOut()}
					className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-lg font-medium rounded-sm shadow-sm text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
					Log Out
				</button>
			</UserLayout>
		);
	}

	return (
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
						ref={inputEmail}
					/>
					<input
						type="password"
						autoComplete="new-password"
						placeholder="Choose Password"
						className="block w-full rounded-md"
						ref={password}
					/>
					<div>
						<button className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-lg font-medium rounded-sm shadow-sm text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
							Log In
						</button>
						<div className="mt-2">
							<Link href="/pro/reset-password/">
								<a className="bll">Forgot Password?</a>
							</Link>
						</div>
					</div>
				</div>
			</form>
			Need an account?{' '}
			<Link href="/pro/">
				<a className="bll">Sign up here</a>
			</Link>
		</UserLayout>
	);
}
