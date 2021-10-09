import { AgGridColumn, AgGridReact } from 'ag-grid-react';
// import { useUserInfo } from 'hooks/useUserInfo';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export function PortfolioTable() {
	// const { email, token } = useUserInfo();

	const rowData = [
		{ symbol: 'AAPL', price: 35000, change: '+2.13%' },
		{ symbol: 'MSFT', price: 32000, change: '+0.06%' },
		{ symbol: 'GOOGL', price: 72000, change: '-0.34%' },
	];

	return (
		<div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
			<AgGridReact reactUi={true} rowData={rowData}>
				<AgGridColumn field="symbol"></AgGridColumn>
				<AgGridColumn field="price"></AgGridColumn>
				<AgGridColumn field="change"></AgGridColumn>
			</AgGridReact>
		</div>
	);
}
