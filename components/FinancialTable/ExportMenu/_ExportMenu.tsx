import { authState } from 'state/authState';
import dynamic from 'next/dynamic';

const ExportButtons = dynamic(() => import('./ExportButtons'), {
	ssr: false,
});

const ExportButtonsRestricted = dynamic(() => import('./ExportButtonsRestricted'), {
	ssr: false,
});

interface Props {
	symbol: string;
	statement: string;
	range: string;
	setExportOpen: (arg: boolean) => void;
}

export const ExportMenu = ({
	symbol,
	statement,
	range,
	setExportOpen,
}: Props) => {
	const isPro = authState((state) => state.isPro);

	return (
		<div className="absolute right-0 flex flex-col w-full shadow-lg border border-gray-200 rounded-md dropdown-menu">
			{!isPro ? (
				<ExportButtonsRestricted />
			) : (
				<ExportButtons
					symbol={symbol}
					statement={statement}
					range={range}
					setExportOpen={setExportOpen}
				/>
			)}
		</div>
	);
};
