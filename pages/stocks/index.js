import Link from "next/link";
import LayoutSidebar from "@/Layout/LayoutSidebar";
import Table from "@/Tables/TablePaginated";

export default function StocksIndexPage({ stocks }) {
	const columnHeaders = [
		{
			Header: "Stock Symbol",
			accessor: "symbol",
			Cell: function SymbolCell({ cell: { value } }) {
				return <Link href={`/stocks/${value.toLowerCase()}`}>{value}</Link>;
			},
		},
		{
			Header: "Company Name",
			accessor: "company",
		},
	];

	return (
		<LayoutSidebar title="All Stocks">
			<Table columnHeaders={columnHeaders}>{stocks}</Table>
		</LayoutSidebar>
	);
}

export async function getStaticProps() {
	const stocksList = await fetch(process.env.API_URL + "/index?type=stocks");
	const json = await stocksList.json();

	return {
		props: {
			stocks: json,
		},
	};
}
