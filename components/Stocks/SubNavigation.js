import Link from "next/link";
import { financialsState } from "@State/financialsState";
import { useRouter } from "next/router";
import { useEffect } from "react";

// styles
const common = "block text-sm py-1 sm:py-2 px-2 sm:px-5 cursor-pointer";
const inactive = common + " text-blue-500 hover:text-black hover:bg-gray-100";
const active = common + " text-black bg-gray-100";

export default function TabNavigation({ path }) {
	return (
		<div className="flex flex-row justify-between">
			<Statement path={path} />
			<Period path={path} />
		</div>
	);
}

const Statement = ({ path }) => {
	return (
		<nav className="mb-4">
			<ul className="flex flex-row w-full overflow-auto">
				<li>
					<Link href={`/stocks/${path.symbol}/financials/`}>
						<a
							className={
								path.subpage !== "balance-sheet" &&
								path.subpage !== "cash-flow-statement" &&
								path.subpage !== "ratios"
									? active
									: inactive
							}>
							Income
						</a>
					</Link>
				</li>
				<li>
					<Link href={`/stocks/${path.symbol}/financials/balance-sheet`}>
						<a
							className={
								path.subpage == "balance-sheet" ? active : inactive
							}>
							Balance Sheet
						</a>
					</Link>
				</li>
				<li>
					<Link
						href={`/stocks/${path.symbol}/financials/cash-flow-statement/`}>
						<a
							className={
								path.subpage == "cash-flow-statement"
									? active
									: inactive
							}>
							Cash Flow
						</a>
					</Link>
				</li>
				<li>
					<Link href={`/stocks/${path.symbol}/financials/ratios/`}>
						<a className={path.subpage == "ratios" ? active : inactive}>
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
		<nav className="mb-4">
			<ul className="flex flex-row w-full overflow-auto">
				<li>
					<span
						className={range == "annual" ? active : inactive}
						onClick={function () {
							setRange("annual");
						}}>
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
						}}>
						Quarterly
					</span>
				</li>
				<li>
					<span
						className={range == "trailing" ? active : inactive}
						onClick={function () {
							setRange("trailing");
						}}>
						Trailing
					</span>
				</li>
			</ul>
		</nav>
	);
};
