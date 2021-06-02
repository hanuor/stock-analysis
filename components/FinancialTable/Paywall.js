export default function Paywall({ range, fullcount, showcount }) {
	let diff = fullcount - showcount;
	let type = range === 'annual' ? 'years' : 'quarters';

	return (
		<div className="flex flex-col px-8 justify-center items-center whitespace-nowrap bg-gray-100 border-l border-gray-300">
			<div className="text-xl font-bold mb-1">
				Showing {showcount} of {fullcount} {type}
			</div>
			<div className="text-lg mb-3">
				{diff} more {type} are available
			</div>
			<button className="bg-gray-500 text-white py-3 px-5 text-xl font-semibold">
				Start Free Trial
			</button>
		</div>
	);
}
