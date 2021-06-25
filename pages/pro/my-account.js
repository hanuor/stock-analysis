import { useState } from 'react';
import { useAuth } from 'firebase/AuthContext';
import Layout from '@/Layout/LayoutFullWidth';
import HeaderLogo from '@/components/Layout/Header/HeaderLogo';

export default function MyAccount() {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { logout, currentUser } = useAuth();

	async function handleSubmit(e) {
		e.preventDefault();

		setError('');
		setLoading(true);

		try {
			await logout();
			console.log('Successfully logged out');
		} catch {
			setError('Failed to log out');
			console.log('Failed to log out');
		}

		setLoading(false);
	}

	if (!currentUser) {
		return null;
	}

	return (
		<Layout>
			<div className="max-w-[850px] mx-auto text-center px-6 py-20 sm:px-0">
				<HeaderLogo className="h-28 w-28 mx-auto mb-8" />
				<h1 className="text-3xl xs:text-5xl font-bold mb-5 text-gray-800">
					My Account
				</h1>
				{error && (
					<div className="border border-red-300 bg-red-50 p-2">
						Error: {error}
					</div>
				)}
				<div>Email: {currentUser.email}</div>
				<button
					disabled={loading}
					onClick={handleSubmit}
					className="inline-flex items-center justify-center w-52 px-4 py-2 border border-transparent text-lg font-medium rounded-sm shadow-sm text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4">
					Log Out
				</button>
			</div>
		</Layout>
	);
}
