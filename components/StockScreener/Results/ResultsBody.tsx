import { getData } from 'functions/API';
import { useState, useEffect } from 'react';
import { ResultsTable } from './ResultsTable';

const COLUMNS = [
	{
		Header: 'Symbol',
		accessor: 's',
	},
	{
		Header: 'Company Name',
		accessor: 'n',
	},
	{
		Header: 'Industry',
		accessor: 'i',
	},
	{
		Header: 'Market Cap',
		accessor: 'm',
	},
];

interface StockType {
	s: string;
	n: string;
	cls?: string;
	aum?: number;
	ind?: string;
	mcap?: number;
}

export function ResultsBody() {
	const [stocks, setStocks] = useState<StockType[]>();

	useEffect(() => {
		async function fetchData() {
			const res = await getData('index?type=stockspage');
			setStocks(res);
		}

		fetchData();
	}, []);

	if (stocks) {
		return <ResultsTable rowdata={stocks} cols={COLUMNS} />;
	} else {
		return null;
	}
}
