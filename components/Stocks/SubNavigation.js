import Link from "next/link";
import { financialsState } from "@State/financialsState";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "@/Styles/TabMenu.module.css";

// styles
const common =
	"text-[15px] sm:text-base block py-2 sm:py-2 px-2.5 sm:px-5 cursor-pointer whitespace-nowrap";
const inactive =
	common +
	" text-blue-500 hover:text-black hover:bg-gray-100  hover:font-semibold";
const active = common + " text-black bg-gray-100 font-semibold";

export default function TabNavigation({ path }) {
	return (
		<div className="flex flex-col sm:flex-row justify-between">
			<Statement path={path} />
			<Period path={path} />
		</div>
	);
}

const Statement = ({ path }) => {
	const statement = financialsState((state) => state.statement);

	return (
		<nav className="mb-2">
			<ul className={"flex flex-row w-full overflow-auto " + styles.navmenu}>
				<li>
					<Link href={`/stocks/${path.symbol}/financials/`}>
						<a
							className={
								statement == "income_statement" ? active : inactive
							}
							data-title="Income">
							Income
						</a>
					</Link>
				</li>
				<li>
					<Link href={`/stocks/${path.symbol}/financials/balance-sheet`}>
						<a
							className={
								statement == "balance_sheet" ? active : inactive
							}
							data-title="Balance Sheet">
							Balance Sheet
						</a>
					</Link>
				</li>
				<li>
					<Link
						href={`/stocks/${path.symbol}/financials/cash-flow-statement/`}>
						<a
							className={
								statement == "cash_flow_statement" ? active : inactive
							}
							data-title="Cash Flow">
							Cash Flow
						</a>
					</Link>
				</li>
				<li>
					<Link href={`/stocks/${path.symbol}/financials/ratios/`}>
						<a
							className={statement == "ratios" ? active : inactive}
							data-title="Ratios">
							Ratios
						</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

const Period = ({ path }) => {
	const range = financialsState((state) => state.range);
	const setRange = financialsState((state) => state.setRange);

	// Check for period in URL
	useEffect(() => {
		if (typeof window !== "undefined") {
			let url = new URL(window.location.href);
			let params = url.searchParams;
			const period = params.get("period");
			if (period === "quarterly" || period === "trailing") {
				if (period !== range) {
					setRange(period);
				}
			}
		}
	}, []);

	const router = useRouter();
	useEffect(() => {
		let subpage =
			path.subpage === "balance-sheet" ||
			path.subpage === "cash-flow-statement" ||
			path.subpage === "ratios"
				? `${path.subpage}/`
				: "";

		if (range === "quarterly" || range === "trailing") {
			router.push(
				`/stocks/[symbol]/financials/${subpage}?period=${range}`,
				`/stocks/${path.symbol}/financials/${subpage}?period=${range}`,
				{ shallow: true }
			);
		} else {
			router.push(
				`/stocks/[symbol]/financials/${subpage}`,
				`/stocks/${path.symbol}/financials/${subpage}`,
				{ shallow: true }
			);
		}
	}, [range]);

	return (
		<nav className="sm:mb-2">
			<ul className={"flex flex-row w-full overflow-auto " + styles.navmenu}>
				<li>
					<span
						className={range == "annual" ? active : inactive}
						onClick={function () {
							setRange("annual");
						}}
						data-title="Annual">
						Annual
					</span>
				</li>
				<li>
					<span
						className={range == "quarterly" ? active : inactive}
						onClick={function () {
							if (range !== "quarterly") {
								setRange("quarterly");
							}
						}}
						data-title="Quarterly">
						Quarterly
					</span>
				</li>
				<li>
					<span
						className={range == "trailing" ? active : inactive}
						onClick={function () {
							setRange("trailing");
						}}
						data-title="Trailing">
						Trailing
					</span>
				</li>
			</ul>
		</nav>
	);
};
