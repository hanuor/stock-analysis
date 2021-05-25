import Link from "next/link";
import { useRouter } from "next/router";
import SubNavigation from "@/components/Stocks/SubNavigation";
import styles from "@/Styles/TabMenu.module.css";

export default function TabNavigation() {
	const router = useRouter();

	let route = router.asPath;
	let split = route.split("/");
	let type = split[1] || null;
	let symbol = split[2] || null;
	let page = split[3] || "overview";
	let subpage = split[4] || "";
	const path = {
		type,
		symbol,
		page,
		subpage,
	};

	const common = "text-[15px] sm:text-base block py-2 px-2 sm:px-5";
	const inactive =
		common +
		" text-blue-500 hover:text-black hover:bg-gray-100 transition duration-100";
	const active = common + " text-black bg-gray-100 font-semibold";

	return (
		<>
			<nav className="border-b-2 border-gray-300 w-full">
				<ul
					className={
						"flex flex-row w-full overflow-auto " + styles.navmenu
					}>
					<li>
						<Link href={`/stocks/${path.symbol}/`}>
							<a
								className={path.page == "overview" ? active : inactive}
								data-title="Overview">
								Overview
							</a>
						</Link>
					</li>
					<li>
						<Link href={`/stocks/${path.symbol}/financials/`}>
							<a
								className={
									path.page == "financials" ? active : inactive
								}
								data-title="Financials">
								Financials
							</a>
						</Link>
					</li>
					<li>
						<Link href={`/stocks/${path.symbol}/statistics/`}>
							<a
								className={
									path.page == "statistics" ? active : inactive
								}
								data-title="Statistics">
								Statistics
							</a>
						</Link>
					</li>
					<li>
						<Link href={`/stocks/${path.symbol}/company/`}>
							<a
								className={path.page == "company" ? active : inactive}
								data-title="Profile">
								Profile
							</a>
						</Link>
					</li>
					<li>
						<Link href={`/stocks/${path.symbol}/chart/`}>
							<a
								className={path.page == "chart" ? active : inactive}
								data-title="Chart">
								Chart
							</a>
						</Link>
					</li>
				</ul>
			</nav>
			{path.page == "financials" && <SubNavigation path={path} />}
		</>
	);
}
