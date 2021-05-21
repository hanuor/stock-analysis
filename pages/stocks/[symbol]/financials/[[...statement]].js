/* eslint-disable react/display-name */
import Stock from "@/components/Layout/StockLayout";
import PageContext from "@/components/Context/PageContext";
import FinancialTable from "@/components/Tables/TableFinancial";
import { getPageData, getStockInfo } from "@/Functions/fetchStockInfo";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { financialsState } from "@State/financialsState";

export default function FinancialsPage(props) {
	if (!props.info) {
		return <h1>Loading...</h1>;
	}

	const statement = financialsState((state) => state.statement);
	const setStatement = financialsState((state) => state.setStatement);

	const router = useRouter();
	useEffect(() => {
		let route = router.asPath;
		let split = route.split("/");
		let subpage = split[4] || "income-statement";

		if (subpage !== statement) {
			switch (subpage) {
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
	}, []);

	return (
		<Stock props={props.info}>
			<PageContext.Provider value={props.data}>
				<FinancialTable props={props.info} />
			</PageContext.Provider>
		</Stock>
	);
}

export async function getStaticPaths() {
	return { paths: [], fallback: true };
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
