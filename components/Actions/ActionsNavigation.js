import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/Styles/TabMenu.module.css';
import navState from '@State/navState';

const Navigation = () => {
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
		'py-1.5 px-2.5 xs:px-3.5 sm:px-5 block bg-[#eee] font-semibold text-gray-900';
	const inactive =
		'py-1.5 px-2.5 xs:px-3.5 sm:px-5 block bll hover:text-gray-900 hover:bg-[#eee] transition duration-100';

	return (
		<div className="mb-1">
			<div>
				<nav className="border-b-[3px] border-blue-brand_sharp mb-1.5">
					<ul className={`flex ${styles.navmenu} overflow-auto`}>
						<li>
							<Link href="/actions/">
								<a
									data-title="Actions"
									className={
										!path.two || path.two === '#' ? active : inactive
									}>
									Actions
								</a>
							</Link>
						</li>
						<li>
							<Link href="/actions/changes/">
								<a
									data-title="Changes"
									className={
										path.two === 'changes' ? active : inactive
									}>
									Changes
								</a>
							</Link>
						</li>
						<li>
							<Link href="/actions/spinoffs/">
								<a
									data-title="Spinoffs"
									className={
										path.two === 'spinoffs' ? active : inactive
									}>
									Spinoffs
								</a>
							</Link>
						</li>
						<li>
							<Link href="/actions/splits/">
								<a
									data-title="Splits"
									className={
										path.two === 'splits' ? active : inactive
									}>
									Splits
								</a>
							</Link>
						</li>
						<li>
							<Link href="/actions/delisted/">
								<a
									data-title="Delisted"
									className={
										path.two === 'delisted' ? active : inactive
									}>
									Delisted
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
