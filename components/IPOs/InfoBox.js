/* This example requires Tailwind CSS v2.0+ */
import { InformationCircleIcon } from '@heroicons/react/solid';

export default function Example({ text }) {
	return (
		<div className="rounded bg-white border border-gray-300 p-3 sm:p-4 mb-2">
			<div className="sm:flex flex-row items-center sm:space-x-4">
				<div className="float-left mr-1 sm:mr-0 sm:block flex-shrink-0">
					<InformationCircleIcon
						className="h-6 sm:h-7 w-6 sm:w-7 text-blue-400"
						aria-hidden="true"
					/>
				</div>
				<div className="sm:ml-3 flex-1 md:flex md:justify-between">
					<p className="text-base md:text-lg text-gray-900">{text}</p>
				</div>
			</div>
		</div>
	);
}
