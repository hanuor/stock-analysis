import Link from 'next/link';

interface Props {
	range: string;
	fullcount: number;
	showcount: number;
}

export default function Paywall({ range, fullcount, showcount }: Props) {
	const diff = fullcount - showcount;
	const type = range === 'annual' ? 'years' : 'quarters';

	return (
		<div className="flex flex-col px-8 justify-center items-center whitespace-nowrap bg-gray-100 border-l border-gray-300">
			<div className="text-xl font-bold mb-1">
				Showing {showcount} of {fullcount} {type}
			</div>
			<div className="text-lg mb-3">
				{diff} more {type} are available
			</div>
			<Link href="/pro/" prefetch={false}>
				<a
					className="bg-blue-brand_light hover:bg-blue-brand_sharp text-white py-3 px-5 text-xl font-semibold rounded-sm"
					id="free-trial-financials-table"
				>
					Start Free Trial
				</a>
			</Link>
		</div>
	);
}
