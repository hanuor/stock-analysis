import { useEffect } from 'react';
import Meta from '@/components/Meta';
import Header from '@/components/Layout/Header/_Header';
import Footer from '@/components/Layout/Footer/_Footer';
import HeaderLogo from '@/components/Layout/Header/HeaderLogo';

export default function FreeTrial() {
	useEffect(() => {
		const paddleJs = document.createElement('script');
		paddleJs.src = 'https://cdn.paddle.com/paddle/paddle.js';
		document.body.appendChild(paddleJs);

		paddleJs.onload = () => {
			// eslint-disable-next-line no-undef
			Paddle.Setup({ vendor: 128917 });
		};
	}, []);

	return (
		<>
			<Meta title="Start Free Trial" />
			<Header />
			<main>
				<div className="max-w-[850px] mx-auto text-center px-6 py-20 sm:px-0">
					<HeaderLogo className="h-28 w-28 mx-auto mb-8" />
					<h1 className="text-3xl xs:text-4xl sm:text-[60px] font-bold mb-5 text-gray-800">
						Payment info
					</h1>

					<p className="max-w-xl text-lg mx-auto mt-8 text-gray-900 leading-relaxed">
						Before your free month of Stock Analysis Pro starts, we need
						your payment info. You will only be charged after your 30-day
						trial ends.
					</p>

					<div className="mt-10 space-y-6 max-w-lg mx-auto">
						<div className="flex items-center">
							<input
								id="accept-terms"
								name="accept-terms"
								type="checkbox"
								className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-400 rounded"
							/>
							<label
								htmlFor="accept-terms"
								className="ml-2 block text-base text-gray-900 text-left">
								Check this box to agree to our terms of use and privacy
								policy.
							</label>
						</div>
						<button
							className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-lg font-medium rounded-sm shadow-sm text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4"
							onClick={() => {
								// eslint-disable-next-line no-undef
								Paddle.Checkout.open({
									product: 649892,
									email: 'krisdong@stockanalysis.com',
								});
							}}>
							Add payment details
						</button>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
