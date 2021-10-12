import {
	GlobeAltIcon,
	LightningBoltIcon,
	ScaleIcon,
} from '@heroicons/react/outline';

const features = [
	{
		name: 'Data accuracy',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
		icon: GlobeAltIcon,
	},
	{
		name: 'Ease of use',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
		icon: ScaleIcon,
	},
	{
		name: 'Speed',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
		icon: LightningBoltIcon,
	},
	{
		name: 'Data accuracy',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
		icon: GlobeAltIcon,
	},
	{
		name: 'Ease of use',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
		icon: ScaleIcon,
	},
	{
		name: 'Speed',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
		icon: LightningBoltIcon,
	},
];

export function AboutFeatures() {
	return (
		<section className="py-12 bg-white">
			<div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
				<div className="lg:text-center">
					<p className="my-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
						What sets us apart
					</p>
				</div>
				<dl className="mt-14 space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
					{features.map((feature) => (
						<div key={feature.name}>
							<dt>
								<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
									<feature.icon
										className="h-6 w-6"
										aria-hidden="true"
									/>
								</div>
								<p className="mt-5 text-lg leading-6 font-medium text-gray-900">
									{feature.name}
								</p>
							</dt>
							<dd className="mt-2 text-base text-gray-500">
								{feature.description}
							</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
}
