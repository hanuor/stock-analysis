import Stock from "@/components/Layout/StockLayout";
import FinancialTable from "@/components/Tables/FinancialTable";
import { getPageData, getStockInfo } from "@/Functions/fetchStockInfo";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { stockState } from "@State/stockState";
import { financialsState } from "@State/financialsState";

export default function FinancialsPage(props) {
	if (!props.info) {
		return <h1>Loading...</h1>;
	}

	const setInfo = stockState((state) => state.setInfo);
	const setFinancialData = financialsState((state) => state.setFinancialData);

	useEffect(() => {
		setInfo(props.info);
		setFinancialData(props.data);
	}, []);

	const statement = financialsState((state) => state.statement);
	const setStatement = financialsState((state) => state.setStatement);

	const router = useRouter();
	useEffect(() => {
		let route = router.asPath;
		let split = route.split("/");
		let subpage = split[4] || "income-statement";

		if (subpage !== statement) {
			switch (subpage) {
				case "income-statement": {
					setStatement("income_statement");
					break;
				}

				case "balance-sheet": {
					setStatement("balance_sheet");
					break;
				}

				case "cash-flow-statement": {
					setStatement("cash_flow_statement");
					break;
				}

				case "ratios": {
					setStatement("ratios");
					break;
				}
			}
		}
	});

	return (
		<Stock>
			<FinancialTable />
		</Stock>
	);
}

export async function getStaticPaths() {
	return { paths: [], fallback: "blocking" };
}

export async function getStaticProps({ params }) {
	const info = await getStockInfo({ params });
	const data = await getPageData(info.id, "financials");

	return {
		props: {
			info,
			data,
		},
	};
}
