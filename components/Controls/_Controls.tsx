import 'regenerator-runtime/runtime';
import { FilterValue } from 'react-table';
import { Export } from './Export';
import { Filter } from './Filter';
import dynamic from 'next/dynamic';

// Load dynamically if rarely used
const SplitsFilter = dynamic(() => import('components/Controls/SplitsFilter'), {
	ssr: false,
});

interface Props {
	count: number;
	title: string;
	useAsyncDebounce?: (value: any, wait: number) => any;
	globalFilter?: any;
	setGlobalFilter?: (filterValue: FilterValue) => void;
	tableId: string;
	append?: string;
	setColumnFilter?: (columId: string, updater: any) => void;
}

export const Controls = ({
	count,
	title,
	useAsyncDebounce,
	globalFilter,
	setGlobalFilter,
	tableId,
	setColumnFilter,
	append = '',
}: Props) => {
	return (
		<div className="flex items-center border-t border-gray-200 space-x-4 bp:space-x-6 py-1.5 bp:py-2 px-1">
			<div className="mr-auto">
				<h2 className="text-xl bp:text-2xl font-semibold whitespace-nowrap">
					{`${append}${count} ${title}`}
				</h2>
			</div>
			{setColumnFilter && (
				<div className="hidden sm:block">
					<SplitsFilter setColumnFilter={setColumnFilter} />
				</div>
			)}
			<div className="hidden sm:block">
				<Export
					title="Export"
					buttons={[
						{ title: 'Export to Excel', type: 'xlsx', restricted: true },
						{ title: 'Export to CSV', type: 'csv', restricted: true },
					]}
					tableId={tableId}
				/>
			</div>
			{useAsyncDebounce && setGlobalFilter && (
				<div>
					<Filter
						useAsyncDebounce={useAsyncDebounce}
						globalFilter={globalFilter}
						setGlobalFilter={setGlobalFilter}
					/>
				</div>
			)}
		</div>
	);
};
