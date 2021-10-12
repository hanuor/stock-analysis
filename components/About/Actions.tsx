export function AboutActions() {
	return (
		<section className="bg-white">
			<div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
				<div className="lg:grid lg:grid-cols-3 lg:gap-8">
					<div>
						<h2 className="text-3xl font-extrabold text-gray-900">
							Frequently asked questions
						</h2>
						<p className="mt-4 text-lg text-gray-500">
							Can’t find the answer you’re looking for? Reach out to our{' '}
							<a
								href="#"
								className="font-medium text-indigo-600 hover:text-indigo-500"
							>
								customer support
							</a>{' '}
							team.
						</p>
					</div>
					<div className="mt-12 lg:mt-0 lg:col-span-2">
						<div className="space-y-12">
							<div>
								<div className="text-lg leading-6 font-medium text-gray-900">
									Are you a serious investor?
								</div>
								<div className="mt-2 text-base text-gray-500">
									Consider upgrading to Stock Analysis Pro for even
									more data and unlimited export ability.
								</div>
							</div>
							<div>
								<div className="text-lg leading-6 font-medium text-gray-900">
									Are you a developer?
								</div>
								<div className="mt-2 text-base text-gray-500">
									Help us code the site on Github or check out our API
									offerings.
								</div>
							</div>
							<div>
								<div className="text-lg leading-6 font-medium text-gray-900">
									See something that can be improved?
								</div>
								<div className="mt-2 text-base text-gray-500">
									We are committed to the absolute highest standards of
									data accuracy. If you see anything that looks
									inaccurate, send us a message and we will look into
									it immediately.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
