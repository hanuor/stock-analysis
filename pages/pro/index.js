import { SEO } from 'components/SEO';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import registrationState from 'state/registrationState';

export default function LandingPage() {
	const router = useRouter();
	const setEmail = registrationState((state) => state.setEmail);
	const setPassword = registrationState((state) => state.setPassword);
	const auth = getAuth();

	useEffect(() => {
		const paddleJs = document.createElement('script');
		paddleJs.src = 'https://cdn.paddle.com/paddle/paddle.js';
		document.body.appendChild(paddleJs);

		paddleJs.onload = () => {
			// eslint-disable-next-line no-undef
			Paddle.Environment.set('sandbox');
			// eslint-disable-next-line no-undef
			// eslint-disable-next-line new-cap
			Paddle.Setup({ vendor: 2545 });
		};
	}, []);

	function checkoutComplete(data) {
		const checkoutId = data.checkout.id;

		// eslint-disable-next-line no-undef
		Paddle.Order.details(checkoutId, async function (data) {
			const email = data.order.customer.email;
			const password = Math.random().toString(36).slice(-8) + '?!337';

			setEmail(email);
			setPassword(password);

			createUserWithEmailAndPassword(auth, email, password)
				.then(() => router.push('/pro/confirmation/'))
				.catch((error) => console.error('There was an error:', error));
		});
	}

	return (
		<>
			<SEO
				title="Stock Analysis Pro: Free 30-Day Trial"
				description="Get unlimited access to all of our financial data, including full financial history, full ETF holdings, and more."
				canonical="pro/"
			/>
			<main>
				<header className="bg-gray-100 py-12 md:py-32 border-b border-gray-200 shadow-sm px-4">
					<div className="max-w-[850px] mx-auto text-center px-6 sm:px-0">
						<h1 className="text-3xl xs:text-4xl sm:text-[60px] font-bold mb-5 text-gray-800">
							Stock Analysis Pro
						</h1>

						<p className="text-lg sm:text-[21px] text-gray-900 leading-relaxed">
							Get unlimited access to all of our financial data while
							getting rid of ads and helping to support our mission of
							making the world&apos;s best investing website.
						</p>
					</div>
				</header>

				<section className="max-w-screen-md mx-auto sm:flex flex-row justify-around mt-[-20px] sm:mt-[-65px]">
					<div className="bg-white mx-auto w-[90%] sm:max-w-[44%]">
						<table className="border border-gray-200 w-full">
							<thead>
								<tr className="border-b border-gray-200">
									<th className="text-left p-3 sm:px-4 text-xl">
										Pro
									</th>
								</tr>
							</thead>
							<tbody>
								<tr className="border-b border-gray-200">
									<td className="p-3 sm:px-4 text-lg">
										Free for 30 days, then $9.99 a month. Cancel
										anytime.
									</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 sm:px-4 text-lg">
										Unlimited access to all available data.
									</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 sm:px-4 text-lg">
										Financial history: Up to 26 years and growing.
									</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 sm:px-4 text-lg">
										Full access to ETF holdings.
									</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 sm:px-4 text-lg">
										Full corporate actions data.
									</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 sm:px-4 text-lg">
										More features coming soon.
									</td>
								</tr>
								<tr className="">
									<td className="p-3 sm:px-4 text-lg">No ads.</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-0">
										<button
											onClick={() => {
												// eslint-disable-next-line no-undef
												Paddle.Checkout.open({
													product: 13309,
													successCallback: checkoutComplete,
												});
											}}
											id="start-trial"
											className="block w-full p-4 text-2xl bg-blue-brand_light hover:bg-blue-brand_sharp text-white text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
										>
											Start Free Trial
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div className="bg-white mx-auto w-[90%] sm:max-w-[44%] mt-14 sm:mt-0">
						<table className="border border-gray-200 w-full">
							<thead>
								<tr className="border-b border-gray-200">
									<th className="text-left p-3 sm:px-4 text-xl">
										Free
									</th>
								</tr>
							</thead>
							<tbody>
								<tr className="border-b border-gray-200">
									<td className="p-3 sm:px-4 text-lg">
										No registration required.
									</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 sm:px-4 text-lg">
										Financial history: Limited to 10-15 years.
									</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 sm:px-4 text-lg">
										Limited ETF holdings.
									</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 sm:px-4 text-lg">
										Limited corporate actions.
									</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 sm:px-4 text-lg">
										Ad supported.
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>

				<section className="bg-gray-100 mt-16 sm:mt-24 py-8 md:py-10 border-t border-gray-200 px-5">
					<div className="max-w-[750px] mx-auto">
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-5">
							Common Questions
						</h2>

						<h3 className="text-2xl font-bold mb-5 text-gray-800">
							How to sign up
						</h3>

						<p className="text-lg mb-5">
							Click &quot;Start Free Trial&quot; above and enter your
							email and payment details. Then you will instantly get an
							email with a link to create a password and log in to the
							site.
						</p>

						<h3 className="text-2xl font-bold mb-5 text-gray-800">
							How to get support?
						</h3>

						<p className="text-lg mb-5">
							You can send an email to support@stockanalysis.com or send
							a message via the{' '}
							<a href="<?= DOMAIN . '/contact/' ?>">contact form</a>. You
							can also click the chat widget button in the bottom right
							corner.
						</p>

						<h3 className="text-2xl font-bold mb-5 text-gray-800">
							Can I cancel at any time?
						</h3>

						<p className="text-lg mb-5">
							Of course. There is a &quot;Cancel subscription&quot;
							button in the my account area that you get access to after
							signing up. You can also send us a message and we will
							cancel for you.
						</p>

						<h3 className="text-2xl font-bold mb-5 text-gray-800">
							Will my card be charged?
						</h3>

						<p className="text-lg mb-5">
							Your card will not be charged until after 30 days. If you
							cancel before the 30 days then you will not be charged at
							all.
						</p>

						<h3 className="text-2xl font-bold mb-5 text-gray-800">
							What about the existing free site?
						</h3>

						<p className="text-lg mb-5">
							We plan on making the world&apos;s best <em>free</em>{' '}
							investing website, and that includes building more useful
							features. But some features and data will only be available
							to &quot;Pro&quot; accounts.
						</p>
					</div>
				</section>
			</main>
		</>
	);
}
