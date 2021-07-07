import Link from 'next/link';
import styles from 'styles/TabMenu.module.css';
import { useNavState } from 'hooks/useNavState';

const SubNavigation = () => {
	const path = useNavState();

	const active =
		'py-1.5 px-3.5 xs:px-4 block font-semibold bg-[#eee] text-gray-900';
	const inactive =
		'py-1.5 px-3.5 xs:px-4 block bll hover:bg-[#eee] hover:text-gray-700 transition duration-100';

	if (!path.two || ['#', '2021', '2020', '2019'].includes(path.two)) {
		return (
			<div>
				<nav className="mb-1 sm:mb-2 lg:mb-3">
					<ul className={`flex space-x-1 ${styles.navmenu} overflow-auto`}>
						<li>
							<Link href="/ipos/" prefetch={false}>
								<a
									data-title="Recent"
									className={
										!path.two || path.two === '#' ? active : inactive
									}
								>
									Recent
								</a>
							</Link>
						</li>
						<li>
							<Link href="/ipos/2021/" prefetch={false}>
								<a
									data-title="2021"
									className={path.two === '2021' ? active : inactive}
								>
									2021
								</a>
							</Link>
						</li>
						<li>
							<Link href="/ipos/2020/" prefetch={false}>
								<a
									data-title="2020"
									className={path.two === '2020' ? active : inactive}
								>
									2020
								</a>
							</Link>
						</li>
						<li>
							<Link href="/ipos/2019/" prefetch={false}>
								<a
									data-title="2019"
									className={path.two === '2019' ? active : inactive}
								>
									2019
								</a>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		);
	} else {
		return null;
	}
};

export default SubNavigation;
