import { useState, useRef } from 'react';
import { useAuth } from 'firebase/AuthContext';
import HeaderLogo from '@/components/Layout/Header/HeaderLogo';
import Link from 'next/link';

// kris@stocka
// kiddi
// 123

export default function LoginForm() {
	const email = useRef();
	const password = useRef();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			await login(email.current.value, password.current.value);
		} catch {
			setError('Failed to log in');
		}

		setLoading(false);
	}

	return (
		<div className="max-w-[850px] mx-auto text-center px-6 py-20 sm:px-0">
			<HeaderLogo className="h-28 w-28 mx-auto mb-8" />
			<h1 className="text-3xl xs:text-5xl font-bold mb-5 text-gray-800">
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
						ref={email}
					/>
					<input
						type="password"
						autoComplete="new-password"
						placeholder="Choose Password"
						className="block w-full rounded-md"
						ref={password}
					/>
					<div>
						<button
							disabled={loading}
							className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-lg font-medium rounded-sm shadow-sm text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
							Log In
						</button>
						<div className="mt-2">
							<Link href="/pro/set-password/">
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
			.
		</div>
	);
}
