import { useTable } from 'react-table';
import styles from './Table.module.css';
import Link from 'next/link';

const columns = [
	{
		Header: 'IPO Date',
		accessor: 'date',
		Cell: function DateCell({ cell: { value } }) {
			return value || 'Pending';
		},
	},
	{
		Header: 'Symbol',
		accessor: 'symbol',
		Cell: function DateCell({ cell: { value } }) {
			return (
				<Link href={`/stocks/${value.toLowerCase()}`}>
					<a className="bll">{value}</a>
				</Link>
			);
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

const NoIpos = ({ title }) => {
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

		case 'Next Week or Later': {
			return (
				<div>
					<h2 className="hh2">{title}</h2>
					<p className="text-lg text-gray-900">
						There are no upcoming IPOs scheduled for next week.
					</p>
				</div>
			);
		}

		case 'More Upcoming IPOs': {
			return (
				<div>
					<h2 className="hh2">{title}</h2>
					<p className="text-lg text-gray-900">
						There are no upcoming but unscheduled IPOs.
					</p>
				</div>
			);
		}

		default:
			return null;
	}
};

const CalendarTable = ({ title, data }) => {
	const tableInstance = useTable({ columns, data });
	let thisWeek = title === 'This Week' ? true : false;
	let nextWeek = title === 'Next Week or Later' ? true : false;

	if (data.length === 0) {
		return <NoIpos title={title} />;
	}

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		tableInstance;

	return (
		<div>
			<h2 className="hh2 mb-2 sm:mb-3">{title}</h2>
			<div className="overflow-x-auto">
				<table
					{...getTableProps()}
					className={`${styles.ipotable} ${styles.striped}`}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps()}>
										{column.render('Header')}
										{thisWeek ||
										(nextWeek && column.Header === 'IPO Date')
											? '*'
											: null}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{rows.map((row) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											<td {...cell.getCellProps()}>
												{cell.render('Cell')}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			{thisWeek ||
				(nextWeek && (
					<span className="text-sm text-gray-600 mt-1">
						* Upcoming IPO dates are estimated and may change
					</span>
				))}
		</div>
	);
};

export default CalendarTable;
