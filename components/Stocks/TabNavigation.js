import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TabNavigation() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);

	const [path, setPath] = useState({
		type: "",
		symbol: "",
		page: "",
		subpage: "",
	});

	useEffect(() => {
		let route = router.asPath;
		let split = route.split("/");
		let type = split[1] || null;
		let symbol = split[2] || null;
		let page = split[3] || "overview";
		let subpage = split[4] || "none";

		setPath({
			type,
			symbol,
			page,
			subpage,
		});

		setIsLoading(false);
	}, []);

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	const inactive =
		"block text-blue-500 hover:text-black hover:bg-gray-100 py-1 sm:py-2 px-2 sm:px-5";
	const active = "block text-black bg-gray-100 py-1 sm:py-2 px-2 sm:px-5";

	const inactive_sub =
		"block text-sm text-blue-500 hover:text-black hover:bg-gray-100 py-1 sm:py-2 px-2 sm:px-5";
	const active_sub =
		"block text-sm text-black bg-gray-100 py-1 sm:py-2 px-2 sm:px-5";

	return (
		<>
			<nav className="border-b-2 border-gray-300 w-full">
				<ul className="flex flex-row w-full overflow-auto">
					<li>
						<Link href={`/stocks/${path.symbol}/`}>
							<a className={path.page == "overview" ? active : inactive}>
								Overview
							</a>
						</Link>
					</li>
					<li>
						<Link href={`/stocks/${path.symbol}/financials/`}>
							<a
								className={
									path.page == "financials" ? active : inactive
								}>
								Financials
							</a>
						</Link>
					</li>
					<li>
						<Link href={`/stocks/${path.symbol}/statistics/`}>
							<a
								className={
									path.page == "statistics" ? active : inactive
								}>
								Statistics
							</a>
						</Link>
					</li>
					<li>
						<Link href={`/stocks/${path.symbol}/company/`}>
							<a className={path.page == "company" ? active : inactive}>
								Profile
							</a>
						</Link>
					</li>
					<li>
						<Link href={`/stocks/${path.symbol}/chart/`}>
							<a className={path.page == "chart" ? active : inactive}>
								Chart
							</a>
						</Link>
					</li>
				</ul>
			</nav>
			{path.page == "financials" && (
				<nav className="mb-4">
					<ul className="flex flex-row w-full overflow-auto">
						<li>
							<Link href={`/stocks/${path.symbol}/financials/`}>
								<a
									className={
										path.subpage == "none" ? active_sub : inactive_sub
									}>
									Income
								</a>
							</Link>
						</li>
						<li>
							<Link
								href={`/stocks/${path.symbol}/financials/balance-sheet`}>
								<a
									className={
										path.subpage == "balance-sheet"
											? active_sub
											: inactive_sub
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
											? active_sub
											: inactive_sub
									}>
									Cash Flow
								</a>
							</Link>
						</li>
						<li>
							<Link href={`/stocks/${path.symbol}/financials/ratios/`}>
								<a
									className={
										path.subpage == "ratios"
											? active_sub
											: inactive_sub
									}>
									Ratios
								</a>
							</Link>
						</li>
					</ul>
				</nav>
			)}
		</>
	);
}
