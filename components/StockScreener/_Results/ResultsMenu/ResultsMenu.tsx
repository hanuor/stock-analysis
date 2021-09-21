import 'regenerator-runtime/runtime';
import { FilterValue } from 'react-table';
import { Export } from 'components/Controls/Export';
import { Filter } from 'components/Controls/Filter';
import { ResultsNav } from './ResultsNav';
import { ColumnDropdown } from 'components/StockScreener/_Results/ResultsMenu/ColumnSelection/ColumnDropdown';

interface Props {
	count: number;
	title: string;
	useAsyncDebounce: (value: any, wait: number) => any;
	globalFilter: any;
	setGlobalFilter: (filterValue: FilterValue) => void;
	tableId: string;
	append?: string;
}

export const ResultsControls = ({
	count,
	useAsyncDebounce,
	globalFilter,
	setGlobalFilter,
	tableId,
}: Props) => {
	return (
		<div className="flex items-center border-t-2 border-blue-brand_sharp mt-5 space-x-4 bp:space-x-5 py-1.5 bp:py-2 px-1 overflow-x-auto lg:overflow-visible">
			<div>
				<h2 className="text-xl bp:text-[1.3rem] font-semibold whitespace-nowrap text-gray-800">
					{`${count} Stocks`}
				</h2>
			</div>
			<div className="flex-grow">
				<ResultsNav />
			</div>
			<div className="max-w-[110px]">
				<Filter
					useAsyncDebounce={useAsyncDebounce}
					globalFilter={globalFilter}
					setGlobalFilter={setGlobalFilter}
					filterText="Search..."
				/>
			</div>
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
			<div>
				<ColumnDropdown />
			</div>
		</div>
	);
};
