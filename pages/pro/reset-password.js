import { useState, useRef } from 'react';
import { auth } from 'users/firebase';
import UserLayout from 'components/Layout/UserLayout';
import Link from 'next/link';

export default function ForgotPassword() {
	const email = useRef();
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();

		setMessage('');
		setError('');

		try {
			await auth.sendPasswordResetEmail(email.current.value);
			setMessage(
				'Check your email inbox for a link to change your password.'
			);
		} catch (err) {
			setError(err.message);
		}
	}

	return (
		<UserLayout title="Reset Password">
			<div className="max-w-md mx-auto text-center">
				<h1 className="text-3xl xs:text-5xl font-bold mb-5 text-gray-800">
					Reset password
				</h1>

				<form onSubmit={handleSubmit}>
					<div className="my-10 space-y-4">
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
								className="block text-small font-medium text-gray-700 text-left mb-1"
							>
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
							<button className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-lg font-medium rounded-sm shadow-sm text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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
		</UserLayout>
	);
}
