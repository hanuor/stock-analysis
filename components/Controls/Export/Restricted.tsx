import { LockClosedIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

interface ExportItemProps {
	title: string;
}

export default function Restricted({ title }: ExportItemProps) {
	const router = useRouter();

	return (
		<div
			className="bg-gray-100 text-gray-900 flex justify-between items-center px-4 py-2 text-sm"
			onClick={() => router.push('/pro/')}
			title="This feature is available for Pro members."
		>
			{title}
			<LockClosedIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
		</div>
	);
}
