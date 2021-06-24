import { useState } from 'react';
import Meta from '@/components/Meta';
import Header from '@/components/Layout/Header/_Header';
import Footer from '@/components/Layout/Footer/_Footer';
import HeaderLogo from '@/components/Layout/Header/HeaderLogo';

export default function FreeTrial() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const submitForm = () => {
		console.log('form submitted');
	};

	return (
		<>
			<Meta title="Start Free Trial" />
			<Header />
			<main>
				<div className="max-w-[850px] mx-auto text-center px-6 py-20 sm:px-0">
					<HeaderLogo className="h-28 w-28 mx-auto mb-8" />
					<h1 className="text-3xl xs:text-4xl sm:text-[60px] font-bold mb-5 text-gray-800">
						Start your free trial
					</h1>

					<p className="text-lg sm:text-[21px] text-gray-900 leading-relaxed">
						1 month is free. Cancel within 30 days and pay nothing.
					</p>

					<div className="mt-10 space-y-6 max-w-md mx-auto">
						<input
							type="email"
							placeholder="Email"
							className="block w-full rounded-md"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
						<input
							type="password"
							placeholder="Choose Password"
							className="block w-full rounded-md"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
						<button
							className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-lg font-medium rounded-sm shadow-sm text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4"
							onClick={() => submitForm()}>
							Continue
						</button>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
