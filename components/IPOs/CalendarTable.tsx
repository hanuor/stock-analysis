import {
	Column,
	useTable,
	useGlobalFilter,
	useAsyncDebounce,
} from 'react-table';
import { StockLink } from 'components/Links';
import { IpoUpcoming } from 'types/IpoUpcoming';
import { Export } from 'components/Controls/Export';
import { Filter } from 'components/Controls//Filter';

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
		case 'This Week': {
			return (
				<div>
					<h2 className="hh2 mb-2">{title}</h2>
					<p className="text-lg text-gray-900">
						There are no upcoming IPOs remaining for the current week.
					</p>
				</div>
			);
		}

		case 'Next Week': {
			return (
				<div>
					<h2 className="hh2">{title}</h2>
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
	const tableInstance = useTable({ columns, data }, useGlobalFilter);
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
									<th key={index}>{column.render('Header')}</th>
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
				<span className="text-sm text-gray-600 mt-1">
					* Upcoming IPO dates are estimated and may change
				</span>
			)}
		</div>
	);
};
