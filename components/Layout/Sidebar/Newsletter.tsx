import { MailIcon } from 'components/Icons/Mail';

export const NewsletterWidget = () => {
	return (
		<div className="bg-gray-100 overflow-hidden rounded-lg p-6 text-center">
			<h4 className="text-2xl font-bold mb-4">
				The Stock Analysis Newsletter
			</h4>
			<p className="text-xl mb-5">Get the latest updates in your inbox.</p>
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
						value="https://stockanalysis.com/thank-you/"
						id="redirect_1c682bd70a6bff87ede4346cfeb23687"
					/>
					<input type="hidden" name="meta_adtracking" value="Sidebar" />
					<label htmlFor="email" className="sr-only">
						Email
					</label>
					<input
						type="email"
						name="email"
						id="email"
						autoComplete="email"
						className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-base border-gray-300 rounded-md"
						placeholder="Enter your email"
					/>
				</div>

				<input
					name="submit"
					type="submit"
					value="Subscribe Now"
					className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-xl font-semibold rounded-md shadow-sm text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				/>
			</form>
		</div>
	);
};
