import Link from 'next/link';
import styles from 'styles/TabMenu.module.css';
import { useNavState } from 'hooks/useNavState';

export default function TabNavigation() {
	const path = useNavState();

	const common =
		'text-[15px] xs:text-base block py-1.5 sm:py-2 px-2 xs:px-3 sm:px-5';
	const inactive =
		common +
		' bll hover:text-gray-900 hover:bg-gray-100 transition duration-100';
	const active = common + ' text-gray-900 bg-[#eee] font-semibold';

	return (
		<>
			<nav className="border-b-2 border-blue-brand_sharp w-full">
				<ul
					className={
						'flex flex-row w-full overflow-auto ' + styles.navmenu
					}
				>
					<li>
						<Link
							href={`/etf/${path.two}/`}
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
							href={`/etf/${path.two}/holdings/`}
							prefetch={false}
							scroll={false}
						>
							<a
								className={path.three == 'holdings' ? active : inactive}
								data-title="Holdings"
							>
								Holdings
							</a>
						</Link>
					</li>
					<li>
						<Link
							href={`/etf/${path.two}/dividend/`}
							prefetch={false}
							scroll={false}
						>
							<a
								className={path.three == 'dividend' ? active : inactive}
								data-title="Dividend"
							>
								Dividend
							</a>
						</Link>
					</li>
					<li>
						<Link
							href={`/etf/${path.two}/chart/`}
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
}