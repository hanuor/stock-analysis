import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useFetchPortfolioList } from './useFetchPortfolioList';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export function PortfolioListTable() {
	const { data } = useFetchPortfolioList();

	function linkPortfolio(params: any) {
		const newlink = `<a href="/portfolio/${params.data.id}/">${params.data.name}</a>`;
		return newlink;
	}

	return (
		<div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
			<AgGridReact rowData={data}>
				<AgGridColumn
					field="name"
					cellRenderer={linkPortfolio}
				></AgGridColumn>
				<AgGridColumn field="symbols"></AgGridColumn>
			</AgGridReact>
		</div>
	);
}
