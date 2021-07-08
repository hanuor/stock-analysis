import UserLayout from 'components/Layout/UserLayout';
import { SEO } from 'components/SEO';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useUserInfo } from 'users/useUserInfo';

export default function Login() {
	const auth = getAuth();
	const { user, isLoggedIn } = useUserInfo();
	const [error, setError] = useState('');
	const inputEmail = useRef();
	const password = useRef();
	const router = useRouter();

	function handleSubmit(e) {
		e.preventDefault();

		signInWithEmailAndPassword(
			auth,
			inputEmail.current.value,
			password.current.value
		).catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log({ errorCode });
			console.log({ errorMessage });
			setError(errorMessage);
		});
	}

	function handleLogout() {
		signOut(auth)
			.then(() => {
				console.log('Logged out successfully');
				router.push('/');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log({ errorCode });
				console.log({ errorMessage });
				setError(errorMessage);
			});
	}

	const PageSeo = () => (
		<SEO title="Log in to Stock Analysis" canonical="login/" />
	);

	if (isLoggedIn && user) {
		return (
			<>
				<PageSeo />
				<UserLayout>
					<h1 className="hh1">You are logged in</h1>
					<div className="mb-2">Email: {user.email}</div>
					<button
						onClick={() => handleLogout()}
						className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-lg font-medium rounded-sm shadow-sm text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						Log Out
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
								<Link href="/pro/reset-password/" prefetch={false}>
									<a className="bll">Forgot Password?</a>
								</Link>
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
