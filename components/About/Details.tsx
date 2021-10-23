export function AboutDetails() {
	return (
		<section className="bg-gray-100">
			<div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8 -mb-14">
				<div>
					<h2 className="text-3xl font-bold text-gray-900">
						More details
					</h2>
					<p className="mt-4 text-lg text-gray-600">
						Stock Analysis is owned by a company called Vefir ehf. Kris
						Gunnars owns 90% of the company while Orn Orri owns 10%.
					</p>
					<p className="mt-4 text-lg text-gray-600">
						Vefir ehf. is registered in Iceland but also has operations in
						Bangkok, Thailand.
					</p>
					<h2 className="text-3xl font-bold text-gray-900 mt-5">
						Contact Info
					</h2>
					<p className="mt-4 text-lg text-gray-600">
						Our official mailing address is:
					</p>
					<p className="mt-4 text-lg text-gray-600">
						Vefir ehf.
						<br />
						Austurkor 102,
						<br />
						203, Kopavogur,
						<br />
						Iceland
					</p>
					<p className="mt-4 text-lg text-gray-600">
						You can also email us at{' '}
						<a href="mailto:contact@stockanalysis.com" className="bll">
							contact@stockanalysis.com
						</a>
						, we would love to hear from you.
					</p>
				</div>
			</div>
		</section>
	);
}
