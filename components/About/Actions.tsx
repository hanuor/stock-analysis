/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';

export function AboutActions() {
	return (
		<section className="bg-white">
			<div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
				<div className="lg:grid lg:grid-cols-3 lg:gap-8">
					<div>
						<h2 className="text-3xl font-bold text-gray-900">
							What to do next
						</h2>
						<p className="mt-4 text-lg text-gray-600">
							Reach out to our{' '}
							<Link href="/contact/" prefetch={false}>
								<a className="font-medium bll">customer support</a>
							</Link>{' '}
							if you can't find the answers you are looking for.
						</p>
					</div>
					<div className="mt-12 lg:mt-0 lg:col-span-2">
						<div className="space-y-12">
							<div>
								<div className="text-xl leading-6 font-medium text-gray-900">
									Are you a serious investor?
								</div>
								<div className="mt-2 text-lg text-gray-600">
									Consider upgrading to{' '}
									<Link href="/pro/" prefetch={false}>
										<a className="font-medium bll">
											Stock Analysis Pro
										</a>
									</Link>{' '}
									for even more data and unlimited export ability.
								</div>
							</div>
							<div>
								<div className="text-xl leading-6 font-medium text-gray-900">
									Are you a developer?
								</div>
								<div className="mt-2 text-lg text-gray-600">
									Help us code the site on{' '}
									<a
										href="https://github.com/stockanalysisdev"
										target="_blank"
										rel="noopener noreferrer"
										className="font-medium bll"
									>
										GitHub
									</a>{' '}
									or check out our{' '}
									<Link href="/apis/" prefetch={false}>
										<a className="font-medium bll">
											API and data offerings
										</a>
									</Link>
									.
								</div>
							</div>
							<div>
								<div className="text-xl leading-6 font-medium text-gray-900">
									See something that can be improved?
								</div>
								<div className="mt-2 text-lg text-gray-600">
									We are committed to the absolute highest standards of
									data accuracy. If you see anything that looks
									inaccurate,{' '}
									<Link href="/contact/" prefetch={false}>
										<a className="font-medium bll">
											send us a message
										</a>
									</Link>{' '}
									and we will look into it immediately.
								</div>
							</div>
							<div>
								<div className="text-xl leading-6 font-medium text-gray-900">
									Want to keep up-to-date with the latest news?
								</div>
								<div className="mt-2 text-lg text-gray-600">
									In that case, you can subscribe to our newsletter or
									follow our site on{' '}
									<a
										href="https://github.com/stockanalysisdev"
										target="_blank"
										rel="noopener noreferrer"
										className="font-medium bll"
									>
										Facebook
									</a>
									,{' '}
									<a
										href="https://twitter.com/stock_analysisx"
										target="_blank"
										rel="noopener noreferrer"
										className="font-medium bll"
									>
										Twitter
									</a>{' '}
									or{' '}
									<a
										href="https://www.linkedin.com/company/stock-analysis"
										target="_blank"
										rel="noopener noreferrer"
										className="font-medium bll"
									>
										Linkedin
									</a>
									.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
