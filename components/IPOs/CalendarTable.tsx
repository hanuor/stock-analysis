import {
	Column,
	useTable,
	useGlobalFilter,
	useAsyncDebounce,
	useSortBy,
} from 'react-table';
import { StockLink } from 'components/Links';
import { IpoUpcoming } from 'types/Ipos';
import 'regenerator-runtime/runtime';
import { Export } from 'components/Controls/Export';
import { Filter } from 'components/Controls//Filter';
import { SortUpIcon } from 'components/Icons/SortUp';
import { SortDownIcon } from 'components/Icons/SortDown';

type CellString = {
	cell: {
		value: string;
	};
};

const columns: Column[] = [
	{
		Header: 'IPO Date',
		accessor: 'date',
		Cell: function DateCell({ cell: { value } }: CellString) {
			return value || 'Pending';
		},
		sortType: (a, b) => {
			const ad = new Date(a.values.date).getTime();
			const bd = new Date(b.values.date).getTime();
			if (ad < bd) {
				return 1;
			}
			if (ad > bd) {
				return -1;
			} else {
				return 0;
			}
		},
		sortInverted: true,
	},
	{
		Header: 'Symbol',
		accessor: 'symbol',
		Cell: function DateCell({ cell: { value } }: CellString) {
			return <StockLink symbol={value} />;
		},
	},
	{
		Header: 'Name',
		accessor: 'name',
		sortType: (a, b) => {
			const ad = a.values.name.toUpperCase();
			const bd = b.values.name.toUpperCase();
			if (ad < bd) {
				return 1;
			}
			if (ad > bd) {
				return -1;
			} else {
				return 0;
			}
		},
		sortInverted: true,
	},
	{
		Header: 'Exchange',
		accessor: 'exchange',
	},
	{
		Header: 'Price Range',
		accessor: 'price',
	},

	{
		Header: 'Shares',
		accessor: 'shares',
	},
];

const NoIpos = ({ title }: { title: string }) => {
	switch (title) {
		case 'IPOs This Week': {
			return (
				<div>
					<h2 className="hh2 mb-2">{title} (0)</h2>
					<p className="text-lg text-gray-900">
						There are no upcoming IPOs remaining for this week.
					</p>
				</div>
			);
		}

		case 'Next Week': {
			return (
				<div>
					<h2 className="hh2">{title} (0)</h2>
					<p className="text-lg text-gray-900">
						There are no upcoming IPOs scheduled for next week.
					</p>
				</div>
			);
		}

		default:
			return null;
	}
};

interface Props {
	title: string;
	data: IpoUpcoming[];
	tableId: string;
}

export const CalendarTable = ({ title, data, tableId }: Props) => {
	const tableInstance = useTable(
		{ columns, data },
		useGlobalFilter,
		useSortBy
	);
	const {
		headerGroups,
		rows,
		prepareRow,
		setGlobalFilter,
		state: { globalFilter },
	} = tableInstance;

	const thisWeek = title === 'IPOs This Week' ? true : false;
	const nextWeek = title === 'Next Week' ? true : false;

	const count = data.length;

	if (count === 0) {
		return <NoIpos title={title} />;
	}

	return (
		<div>
			<div className="flex items-end space-x-6 mb-1.5">
				<h2 className="hh2 text-[1.4rem] text-gray-800 mb-0.5 mr-auto">
					{title} ({count})
				</h2>
				<div className="hidden sm:block">
					<Export
						title="Export"
						buttons={[
							{
								title: 'Export to Excel',
								type: 'xlsx',
								restricted: true,
							},
							{
								title: 'Export to CSV',
								type: 'csv',
								restricted: true,
							},
						]}
						tableId={tableId}
					/>
				</div>
				{title === 'More Upcoming IPOs' && (
					<div className="hidden md:block">
						<Filter
							useAsyncDebounce={useAsyncDebounce}
							globalFilter={globalFilter}
							setGlobalFilter={setGlobalFilter}
						/>
					</div>
				)}
			</div>

			<div className="overflow-x-auto">
				<table className="ipotable" id={tableId}>
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr key={index}>
								{headerGroup.headers.map((column, index) => (
									<th
										{...column.getSortByToggleProps({
											title: `Sort by: ${column.Header}`,
										})}
										key={index}
									>
										<span className="inline-flex flex-row items-center">
											{column.render('Header')}

											{column.isSorted ? (
												column.isSortedDesc ? (
													<SortDownIcon classes="h-5 w-5 text-gray-800" />
												) : (
													<SortUpIcon classes="h-5 w-5 text-gray-800" />
												)
											) : (
												''
											)}
										</span>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{rows.map((row, index) => {
							prepareRow(row);
							return (
								<tr key={index}>
									{row.cells.map((cell, index) => {
										return <td key={index}>{cell.render('Cell')}</td>;
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			{(thisWeek || nextWeek) && (
				<span className="text-sm text-gray-600 mt-1 ml-1">
					Upcoming IPO dates are estimated and may change.
				</span>
			)}
		</div>
	);
};
