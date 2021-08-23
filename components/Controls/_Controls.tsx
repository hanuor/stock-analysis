import { FilterValue } from 'react-table';
// import { Export } from './Export';
import { DropDown } from 'components/DropDown/_DropDown';
import { Filter } from './Filter';
// import { GlobalFilter } from 'components/Tables/GlobalFilter';

interface Props {
	count: number;
	title: string;
	useAsyncDebounce: (value: any, wait: number) => any;
	globalFilter: any;
	setGlobalFilter: (filterValue: FilterValue) => void;
}

export const Controls = ({
	count,
	title,
	useAsyncDebounce,
	globalFilter,
	setGlobalFilter,
}: Props) => {
	return (
		<div className="flex items-center border-t border-gray-200 space-x-6 py-2">
			<div className="mr-auto">
				<h2 className="text-2xl font-semibold">
					{count} {title}
				</h2>
			</div>
			<div>
				<DropDown
					title="View"
					buttons={[
						{ title: '100', restricted: false, active: true },
						{ title: '200', restricted: true, active: false },
						{ title: '500', restricted: true, active: false },
						{ title: 'All', restricted: true, active: false },
					]}
				/>
			</div>
			<div>
				<DropDown
					title="Export"
					buttons={[
						{ title: 'Export to Excel', restricted: false },
						{ title: 'Export to CSV', restricted: true },
					]}
				/>
			</div>
			<div className="flex space-x-1">
				<Filter />
				<DropDown
					title="Filter By"
					buttons={[
						{ title: 'All', restricted: false },
						{ title: 'Date', restricted: true },
						{ title: 'Symbol', restricted: true },
						{ title: 'Name', restricted: true },
						{ title: 'Acquirer', restricted: true },
					]}
				/>
			</div>
		</div>
	);
};
