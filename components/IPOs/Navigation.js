import Link from 'next/link';
import styles from 'styles/TabMenu.module.css';
import navState from 'state/navState';

const Navigation = () => {
	const path = navState((state) => state.path);

	const active =
		'py-1.5 px-2.5 xs:px-3.5 sm:px-5 block bg-[#eee] font-semibold text-gray-900';
	const inactive =
		'py-1.5 px-2.5 xs:px-3.5 sm:px-5 block bll hover:text-gray-900 hover:bg-[#eee] transition duration-100';

	return (
		<div className="mb-1">
			<div>
				<nav className="border-b-[3px] border-blue-brand_sharp mb-1.5">
					<ul className={`flex ${styles.navmenu} overflow-auto`}>
						<li>
							<Link href="/ipos/">
								<a
									data-title="IPOs"
									className={
										!path.two ||
										['#', '2021', '2020', '2019'].includes(path.two)
											? active
											: inactive
									}>
									IPOs
								</a>
							</Link>
						</li>
						<li>
							<Link href="/ipos/calendar/">
								<a
									data-title="Calendar"
									className={
										path.two === 'calendar' ? active : inactive
									}>
									Calendar
								</a>
							</Link>
						</li>
						<li>
							<Link href="/ipos/news/">
								<a
									data-title="News"
									className={path.two === 'news' ? active : inactive}>
									News
								</a>
							</Link>
						</li>
						<li>
							<Link href="/ipos/statistics/">
								<a
									data-title="Statistics"
									className={
										path.two === 'statistics' ? active : inactive
									}>
									Statistics
								</a>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Navigation;
