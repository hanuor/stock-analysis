import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { usePortfolio } from './usePortfolio';
import { TrashIcon } from '@heroicons/react/outline';
import Link from 'next/link';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export function PortfolioTable({ id }: { id: string }) {
	const { data, remove } = usePortfolio(id);

	function Symbol(params: any) {
		const symbol = params.data.symbol;

		const url = symbol.startsWith('$')
			? `/stocks/${symbol.slice(1).toLowerCase()}`
			: symbol.startsWith('#')
			? `/etf/${symbol.slice(1).toLowerCase()}`
			: `/stocks/${symbol.toLowerCase()}`;

		return (
			<Link href={url} prefetch={false}>
				<a>{symbol.slice(1)}</a>
			</Link>
		);
	}

	function Delete(params: any) {
		return (
			<div
				className="h-full flex items-center"
				onClick={() => remove.mutate(params.data.symbol.slice(1))}
			>
				<TrashIcon className="h-5 w-5 text-gray-500 hover:text-red-500 cursor-pointer" />
			</div>
		);
	}

	return (
		<div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
			<AgGridReact reactUi={true} rowData={data}>
				<AgGridColumn field="symbol" cellRendererFramework={Symbol}></AgGridColumn>
				<AgGridColumn field="price"></AgGridColumn>
				<AgGridColumn field="change"></AgGridColumn>
				<AgGridColumn field="edit" cellRendererFramework={Delete}></AgGridColumn>
			</AgGridReact>
		</div>
	);
}
