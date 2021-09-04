import { useRouter } from 'next/router';

import { LockClosedIcon } from '@heroicons/react/solid';

export default function ExportButtonsRestricted() {
	const router = useRouter();

	return (
		<>
			<button
				className="flex items-center justify-between shadow-sm py-2 px-3 text-left bg-white hover:bg-gray-100"
				onClick={() => router.push('/pro/')}
				id="tag-upgr-financials-export-excel"
				title="This feature is available for Pro members."
			>
				Export to Excel
				<LockClosedIcon
					className="h-4 w-4 text-gray-500"
					aria-hidden="true"
				/>
			</button>
			<button
				className="flex items-center justify-between shadow-sm py-2 px-3 text-left bg-white hover:bg-gray-100"
				onClick={() => router.push('/pro/')}
				id="tag-upgr-financials-export-csv"
				title="This feature is available for Pro members."
			>
				Export to CSV
				<LockClosedIcon
					className="h-4 w-4 text-gray-500"
					aria-hidden="true"
				/>
			</button>
		</>
	);
}
