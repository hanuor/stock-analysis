import { WarningIcon } from 'components/Icons/Warning';

interface Props {
	message: string;
}

export const Warning = ({ message }: Props) => (
	<div className="my-5">
		<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-yellow-700">
			<div className="flex flex-row items-center">
				<div className="flex-shrink-0">
					<WarningIcon />
				</div>
				<div className="ml-3 sm:ml-4">
					<span className="text-base">{message}</span>
				</div>
			</div>
		</div>
	</div>
);
