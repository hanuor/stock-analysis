import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/Styles/TabMenu.module.css';
import navState from '@State/navState';

const _IPONavigation = () => {
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

	const active =
		'py-2 px-5 block bg-gray-100 font-semibold text-gray-900 border-b-2 rounded-t border-blue-brand mb-[-2px]';
	const inactive =
		'py-2 px-5 block bll hover:text-gray-900 hover:bg-gray-100 hover:border-b-2 hover:border-gray-400 mb-[-2px] transition duration-100';

	const active_sub =
		'px-5 py-2 font-semibold rounded bg-gray-100 text-gray-900';
	const inactive_sub =
		'px-5 py-2 bll rounded hover:bg-gray-100 hover:text-gray-700';

	return (
		<div className="mb-6">
			<div>
				<nav className="border-b-2 border-gray-300 mb-3">
					<ul className={`flex ${styles.navmenu}`}>
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
			{(!path.two || ['#', '2021', '2020', '2019'].includes(path.two)) && (
				<div>
					<nav className="mb-4">
						<ul className={`flex space-x-2`}>
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
			)}
		</div>
	);
};

export default _IPONavigation;
