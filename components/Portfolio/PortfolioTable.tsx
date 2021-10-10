import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useFetchPortfolio } from './useFetchPortfolio';
// import { useUserInfo } from 'hooks/useUserInfo';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export function PortfolioTable({ id }: { id: string }) {
	const { data } = useFetchPortfolio(id);

	return (
		<div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
			<AgGridReact reactUi={true} rowData={data}>
				<AgGridColumn field="symbol"></AgGridColumn>
				<AgGridColumn field="price"></AgGridColumn>
				<AgGridColumn field="change"></AgGridColumn>
			</AgGridReact>
		</div>
	);
}
