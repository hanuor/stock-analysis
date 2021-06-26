import { useState, useRef } from 'react';
import UserLayout from '@/components/Layout/UserLayout';
import { auth } from '@Firebase/firebase';
import registrationState from '@State/registrationState';

export default function FreeTrial() {
	const newPassword = useRef();
	const password = registrationState((state) => state.password);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	async function handleSetPassword(e) {
		e.preventDefault();

		if (newPassword.current.value.length < 6) {
			return setError('Password needs to be at least 6 characters.');
		}

		setError('');
		await auth.currentUser
			.updatePassword(newPassword.current.value)
			.then(() => {
				setMessage('Your password has been updated.');
			})
			.catch((err) => {
				setError(err.message);
			});
	}

	return (
		<UserLayout title="Confirmation">
			<div className="space-y-6">
				<h1 className="text-4xl font-bold mb-5 text-gray-800">
					Set a password...
				</h1>

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

				{!message && (
					<>
						<p className="text-lg sm:text-xl text-gray-900 leading-relaxed">
							Your free trial subscription has been activated!
						</p>

						<p className="text-lg sm:text-xl text-gray-900 leading-relaxed">
							Your temporary password is: {password}
						</p>

						<p className="text-lg sm:text-xl text-gray-900 leading-relaxed">
							<strong>Please set a password now</strong>.
						</p>
						<div className="max-w-md">
							<form onSubmit={handleSetPassword}>
								<input
									type="password"
									autoComplete="new-password"
									placeholder="Choose Password"
									className="block w-full rounded-md"
									ref={newPassword}
								/>
								<button className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-lg font-medium rounded-sm shadow-sm text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-2">
									Set Password
								</button>
							</form>
						</div>
						<p className="text-lg sm:text-xl text-gray-900 leading-relaxed">
							If you have any problems, send a message to
							support@stockanalysis.com.
						</p>
						<p className="text-lg sm:text-xl text-gray-900 leading-relaxed">
							Best,
							<br />
							The Stock Analysis Team
						</p>
					</>
				)}
			</div>
		</UserLayout>
	);
}
