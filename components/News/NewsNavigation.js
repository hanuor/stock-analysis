import styles from 'styles/TabMenu.module.css';
import Link from 'next/link';
import { useNavState } from 'hooks/useNavState';

const Navigation = () => {
	const path = useNavState();

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
							<Link href="/news/">
								<a
									data-title="Markets"
									className={
										!path.two ||
										['#', '2021', '2020', '2019'].includes(path.two)
											? active
											: inactive
									}
								>
									Markets
								</a>
							</Link>
						</li>
						<li>
							<Link href="/news/all-stocks/">
								<a
									data-title="All Stocks"
									className={
										path.two === 'all-stocks' ? active : inactive
									}
								>
									All Stocks
								</a>
							</Link>
						</li>
						<li>
							<Link href="/news/press-releases/">
								<a
									data-title="Press Releases"
									className={
										path.two === 'press-releases' ? active : inactive
									}
								>
									Press Releases
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
