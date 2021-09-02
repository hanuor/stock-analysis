import { MailIcon } from 'components/Icons/Mail';
import Link from 'next/link';

export const NewsletterWidget = () => {
	return (
		<div className="border border-gray-200 bg-gray-50 rounded p-6 lg:px-7 text-center">
			<h3 className="text-[1.4rem] font-bold mb-4">
				The Stock Analysis Newsletter
			</h3>
			<p className="text-lg mb-5">Get the latest updates in your inbox.</p>
			<form
				method="post"
				acceptCharset="UTF-8"
				action="https://www.aweber.com/scripts/addlead.pl"
			>
				<div className="mt-1 relative rounded-md shadow-sm mb-3">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<MailIcon classes="h-5 w-5 text-gray-400" />
					</div>
					<input
						type="hidden"
						name="meta_web_form_id"
						value="1291541875"
					/>
					<input type="hidden" name="listname" value="awlist5254312" />
					<input
						type="hidden"
						name="redirect"
						value="https://stockanalysis.com/subscribe/thank-you/"
						id="redirect_1c682bd70a6bff87ede4346cfeb23687"
					/>
					<input type="hidden" name="meta_adtracking" value="Sidebar" />
					<label htmlFor="email-sidebar" className="sr-only">
						Email
					</label>
					<input
						type="email"
						name="email"
						id="email-sidebar"
						autoComplete="email"
						className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-base border-gray-300 rounded-md"
						placeholder="Enter your email"
					/>
				</div>

				<input
					name="submit"
					type="submit"
					value="Subscribe Now"
					className="w-full inline-flex justify-center items-center px-6 py-2 border border-transparent text-lg font-semibold rounded-sm shadow-sm text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
				/>
				<div className="text-sm mt-1.5">
					Read the{' '}
					<Link href="/privacy-policy/">
						<a className="bll">privacy policy.</a>
					</Link>
				</div>
			</form>
			<div className="mt-5 mb-3">
				<ul className="flex justify-center space-x-5">
					<li>
						<a
							href="https://www.facebook.com/stockanalysisoff/"
							title="Like us on Facebook"
							rel="noopener noreferrer"
							target="_blank"
							className="text-[#1e73be] hover:text-gray-600"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="48"
								height="48"
								viewBox="0 0 24 24"
								className="fill-current"
							>
								<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"></path>
							</svg>
						</a>
					</li>
					<li>
						<a
							href="https://twitter.com/stock_analysisx"
							title="Follow us on Twitter"
							rel="noopener noreferrer"
							target="_blank"
							className="text-[#00acee] hover:text-gray-600"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="48"
								height="48"
								viewBox="0 0 24 24"
								className="fill-current"
							>
								<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"></path>
							</svg>
						</a>
					</li>
					<li>
						<a
							href="https://www.linkedin.com/company/stock-analysis/"
							title="Follow us on LinkedIn"
							rel="noopener noreferrer"
							target="_blank"
							className="text-[#0077b5] hover:text-gray-600"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="48"
								height="48"
								viewBox="0 0 24 24"
								className="fill-current"
							>
								<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"></path>
							</svg>
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};
