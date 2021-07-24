import Link from 'next/link';
import { navState } from 'state/navState';

interface Symbol {
	symbol: string;
}

export const TabNavigation = ({ symbol }: Symbol) => {
	const path = navState((state) => state.path);

	const common =
		'text-[15px] xs:text-base block py-1.5 sm:py-2 px-2 xs:px-3 sm:px-5';
	const inactive =
		common +
		' bll hover:text-gray-900 hover:bg-gray-100 transition duration-100';
	const active = common + ' text-gray-900 bg-[#eee] font-semibold';

	return (
		<>
			<nav className="border-b-2 border-blue-brand_sharp w-full">
				<ul className="w-full navmenu">
					<li>
						<Link
							href={`/stocks/${symbol}/`}
							prefetch={false}
							scroll={false}
						>
							<a
								className={!path.three ? active : inactive}
								data-title="Overview"
							>
								Overview
							</a>
						</Link>
					</li>
					<li>
						<Link
							href={`/stocks/${symbol}/financials/`}
							prefetch={false}
							scroll={false}
						>
							<a
								className={
									path.three == 'financials' ? active : inactive
								}
								data-title="Financials"
							>
								Financials
							</a>
						</Link>
					</li>
					<li>
						<Link
							href={`/stocks/${symbol}/statistics/`}
							prefetch={false}
							scroll={false}
						>
							<a
								className={
									path.three == 'statistics' ? active : inactive
								}
								data-title="Statistics"
							>
								Statistics
							</a>
						</Link>
					</li>
					<li>
						<Link
							href={`/stocks/${symbol}/company/`}
							prefetch={false}
							scroll={false}
						>
							<a
								className={path.three == 'company' ? active : inactive}
								data-title="Profile"
							>
								Profile
							</a>
						</Link>
					</li>
					<li>
						<Link
							href={`/stocks/${symbol}/chart/`}
							prefetch={false}
							scroll={false}
						>
							<a
								className={path.three == 'chart' ? active : inactive}
								data-title="Chart"
							>
								Chart
							</a>
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
};
