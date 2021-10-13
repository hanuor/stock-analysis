import {
	DatabaseIcon,
	LightningBoltIcon,
	EmojiHappyIcon,
	AdjustmentsIcon,
} from '@heroicons/react/outline';

const features = [
	{
		name: 'Data accuracy',
		description:
			'We are committed to the highest standards of data accuracy using both automated and manual reviews of the data.',
		icon: DatabaseIcon,
	},
	{
		name: 'Ease of use',
		description:
			'Our goal is for the site to be clean, simple and intuitive to both use and understand. It should "just work."',
		icon: EmojiHappyIcon,
	},
	{
		name: 'Speed',
		description:
			'Few things are more annoying than slow and unresponsive websites. This site is super fast and we aim to make everything load instantly.',
		icon: LightningBoltIcon,
	},
	{
		name: 'Integrity',
		description:
			"We don't promote individual stocks and present each data point following objective rules.",
		icon: AdjustmentsIcon,
	},
];

export function AboutFeatures() {
	return (
		<section className="pt-12 pb-16 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="lg:text-center">
					<h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
						What sets us apart
					</h2>
					<p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
						We want to make investing easy and accessible and provide
						accurate, professional-grade data for everyday investors.
					</p>
				</div>

				<div className="mt-10">
					<dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
						{features.map((feature) => (
							<div key={feature.name} className="relative">
								<dt>
									<div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
										<feature.icon
											className="h-6 w-6"
											aria-hidden="true"
										/>
									</div>
									<p className="ml-16 text-lg leading-6 font-medium text-gray-900">
										{feature.name}
									</p>
								</dt>
								<dd className="mt-2 ml-16 text-base text-gray-500">
									{feature.description}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</section>
	);
}
