import { LockClosedIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

interface ExportItemProps {
	title: string;
	type: string;
}

export default function Restricted({ title, type }: ExportItemProps) {
	const router = useRouter();
	const id = `tag-upgr-controls-export-${type.toLowerCase()}`;

	return (
		<div
			className="text-gray-700 hover:bg-gray-100 flex justify-between items-center px-4 py-2 text-sm cursor-pointer"
			onClick={() => router.push('/pro/')}
			title="This feature is available for Pro members."
			id={id}
		>
			{title}
			<LockClosedIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
		</div>
	);
}
