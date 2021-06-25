import { useState, useRef } from 'react';
import { useAuth } from 'firebase/AuthContext';
import HeaderLogo from '@/components/Layout/Header/HeaderLogo';
import Link from 'next/link';

export default function LoginForm() {
	const email = useRef();
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { resetPassword } = useAuth();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setMessage('');
			setError('');
			setLoading(true);
			await resetPassword(email.current.value);
			setMessage('Check your inbox for further instructions');
		} catch {
			setError('Failed to reset password');
		}

		setLoading(false);
	}

	return (
		<div className="max-w-[850px] mx-auto text-center px-6 py-20 sm:px-0">
			<HeaderLogo className="h-28 w-28 mx-auto mb-8" />
			<h1 className="text-3xl xs:text-5xl font-bold mb-5 text-gray-800">
				Reset password
			</h1>

			<form onSubmit={handleSubmit}>
				<div className="my-10 space-y-6 max-w-md mx-auto">
					{error && (
						<div className="border border-red-300 bg-red-50 p-2">
							Error: {error}
						</div>
					)}
					{message && (
						<div className="border border-green-300 bg-green-50 p-2">
							{message}
						</div>
					)}

					<div>
						<label
							htmlFor="email"
							className="block text-small font-medium text-gray-700 text-left mb-1">
							Email
						</label>
						<input
							id="email"
							type="email"
							autoComplete="username"
							placeholder="Email Address"
							className="block w-full rounded-md"
							ref={email}
						/>
					</div>

					<div>
						<button
							disabled={loading}
							className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-lg font-medium rounded-sm shadow-sm text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
							Reset Password
						</button>
						<div className="mt-2">
							<Link href="/login/">
								<a className="bll">Login</a>
							</Link>
						</div>
					</div>
				</div>
			</form>
			<div>
				Need an account?{' '}
				<Link href="/pro/">
					<a className="bll">Sign up here</a>
				</Link>
				.
			</div>
		</div>
	);
}
