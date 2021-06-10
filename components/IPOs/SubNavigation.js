import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/Styles/TabMenu.module.css';
import navState from '@State/navState';

const SubNavigation = () => {
	const router = useRouter();
	const path = navState((state) => state.path);
	const setPath = navState((state) => state.setPath);

	useEffect(() => {
		let route = router.asPath;
		let split = route.split('/');
		let one = split[1] || null;
		let two = split[2] || null;
		let three = split[3] || null;

		setPath({
			one,
			two,
			three,
		});
	}, [router.asPath, setPath]);

	const active_sub =
		'py-1.5 px-3.5 xs:px-4 block font-semibold bg-[#eee] text-gray-900';
	const inactive_sub =
		'py-1.5 px-3.5 xs:px-4 block bll hover:bg-[#eee] hover:text-gray-700 transition duration-100';

	if (!path.two || ['#', '2021', '2020', '2019'].includes(path.two)) {
		return (
			<div>
				<nav className="mb-1 sm:mb-2 lg:mb-3">
					<ul className={`flex space-x-1 ${styles.navmenu} overflow-auto`}>
						<li>
							<Link href="/ipos/">
								<a
									data-title="Recent"
									className={
										!path.two || path.two === '#'
											? active_sub
											: inactive_sub
									}>
									Recent
								</a>
							</Link>
						</li>
						<li>
							<Link href="/ipos/2021/">
								<a
									data-title="2021"
									className={
										path.two === '2021' ? active_sub : inactive_sub
									}>
									2021
								</a>
							</Link>
						</li>
						<li>
							<Link href="/ipos/2020/">
								<a
									data-title="2020"
									className={
										path.two === '2020' ? active_sub : inactive_sub
									}>
									2020
								</a>
							</Link>
						</li>
						<li>
							<Link href="/ipos/2019/">
								<a
									data-title="2019"
									className={
										path.two === '2019' ? active_sub : inactive_sub
									}>
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
