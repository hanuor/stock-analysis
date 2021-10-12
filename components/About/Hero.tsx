export function AboutHero() {
	return (
		<section className="bg-gray-100 py-8 md:py-24 lg:py-40 border-b border-gray-200 shadow-sm px-4 landscape:border-t-2 landscape:md:border-t-0">
			<div className="mx-auto max-w-[850px] text-center">
				<h1 className="text-2xl xs:text-3xl md:text-4xl lg:text-[42px] font-bold mb-5 lg:mb-7">
					About Us
				</h1>
				<p className="text-base xs:text-lg md:text-xl lg:text-[22px] mb-4 md:mb-5 lg:mb-7">
					Welcome to Stock Analysis — a site that aims to be the internet’s
					best source of free stock data and information for regular
					investors.
				</p>
				<div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
					<form className="sm:flex">
						<label htmlFor="email-address" className="sr-only">
							Email address
						</label>
						<input
							id="email-address"
							name="email-address"
							type="email"
							autoComplete="email"
							required
							className="w-full border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white rounded-md"
							placeholder="Enter your email"
						/>
						<button
							type="submit"
							className="mt-3 w-full flex items-center justify-center px-5 py-3 border border-transparent shadow text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
						>
							Notify me
						</button>
					</form>
					<p className="mt-3 text-sm text-indigo-200">
						We care about the protection of your data. Read our{' '}
						<a href="#" className="text-white font-medium underline">
							Privacy Policy.
						</a>
					</p>
				</div>
			</div>
		</section>
	);
}
