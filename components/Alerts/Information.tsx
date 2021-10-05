import { InformationCircleIcon } from '@heroicons/react/solid';

interface Props {
	message: string;
}

export const Information = ({ message }: Props) => (
	<div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-blue-700">
		<div className="flex flex-row items-center">
			<div className="flex-shrink-0">
				<InformationCircleIcon
					className="h-5 w-5 text-blue-400"
					aria-hidden="true"
				/>
			</div>
			<div className="ml-3 sm:ml-4">
				<span className="text-base">{message}</span>
			</div>
		</div>
	</div>
);
