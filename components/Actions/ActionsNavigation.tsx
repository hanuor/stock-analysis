import Link from 'next/link';
import styles from 'styles/TabMenu.module.css';
import { useNavState } from 'hooks/useNavState';

export const ActionsNavigation = () => {
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
							<Link href="/actions/" prefetch={false}>
								<a
									data-title="Actions"
									className={
										!path.two || path.two === '#' ? active : inactive
									}
								>
									Actions
								</a>
							</Link>
						</li>
						<li>
							<Link href="/actions/changes/" prefetch={false}>
								<a
									data-title="Changes"
									className={
										path.two === 'changes' ? active : inactive
									}
								>
									Changes
								</a>
							</Link>
						</li>
						<li>
							<Link href="/actions/spinoffs/" prefetch={false}>
								<a
									data-title="Spinoffs"
									className={
										path.two === 'spinoffs' ? active : inactive
									}
								>
									Spinoffs
								</a>
							</Link>
						</li>
						<li>
							<Link href="/actions/splits/" prefetch={false}>
								<a
									data-title="Splits"
									className={path.two === 'splits' ? active : inactive}
								>
									Splits
								</a>
							</Link>
						</li>
						<li>
							<Link href="/actions/delisted/" prefetch={false}>
								<a
									data-title="Delisted"
									className={
										path.two === 'delisted' ? active : inactive
									}
								>
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
