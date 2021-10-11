import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { usePortfolioList } from './usePortfolioList';
import { TrashIcon } from '@heroicons/react/outline';
import Link from 'next/link';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export function PortfolioListTable() {
	const { data, remove } = usePortfolioList();

	function Name(params: any) {
		return (
			<Link href={`/portfolio/${params.data.id}`} prefetch={false}>
				<a>{params.data.name}</a>
			</Link>
		);
	}

	function Delete(params: any) {
		return (
			<div
				className="h-full flex items-center"
				onClick={() => remove.mutate(params.data.id)}
			>
				<TrashIcon className="h-5 w-5 text-gray-500 hover:text-red-500 cursor-pointer" />
			</div>
		);
	}

	return (
		<div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
			<AgGridReact reactUi={true} rowData={data}>
				<AgGridColumn field="name" cellRendererFramework={Name}></AgGridColumn>
				<AgGridColumn field="symbols"></AgGridColumn>
				<AgGridColumn field="edit" cellRendererFramework={Delete}></AgGridColumn>
			</AgGridReact>
		</div>
	);
}
