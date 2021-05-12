import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TabNavigation() {
	const [symbol, setSymbol] = useState();
	const [tab, setTab] = useState("overview");
	const router = useRouter();

	useEffect(() => {
		let path = router.asPath;
		let split = path.split("/");
		let symbol = split[2] || null;
		let tab = split[3] || "overview";
		setSymbol(symbol);
		setTab(tab);
	}, []);

	const inactive =
		"py-2 px-5 block text-blue-500 hover:text-black hover:bg-gray-100";
	const active = "py-2 px-5 block text-black bg-gray-100";

	return (
		<nav className="mb-4 border-b-2 border-gray-300 w-full">
			<ul className="flex flex-row w-full">
				<li>
					<Link
						href={`/stocks/${symbol}/`}
						onClick={() => setTab("overview")}>
						<a className={tab == "overview" ? active : inactive}>
							Overview
						</a>
					</Link>
				</li>
				<li>
					<Link
						href={`/stocks/${symbol}/financials/`}
						onClick={() => setTab("financials")}>
						<a className={tab == "financials" ? active : inactive}>
							Financials
						</a>
					</Link>
				</li>
				<li>
					<Link
						href={`/stocks/${symbol}/statistics/`}
						onClick={() => setTab("statistics")}>
						<a className={tab == "statistics" ? active : inactive}>
							Statistics
						</a>
					</Link>
				</li>
				<li>
					<Link
						href={`/stocks/${symbol}/company/`}
						onClick={() => setTab("company")}>
						<a className={tab == "company" ? active : inactive}>
							Profile
						</a>
					</Link>
				</li>
				<li>
					<Link
						href={`/stocks/${symbol}/chart/`}
						onClick={() => setTab("chart")}>
						<a className={tab == "chart" ? active : inactive}>Chart</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
}
