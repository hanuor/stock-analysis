import { useEffect, useState } from 'react';
import Link from 'next/link';
import { navState } from 'state/navState';

interface Props {
	type?: string;
	start: number;
}

export const ActionsNavigationSub = ({ type, start }: Props) => {
	const [all, setAll] = useState(false);
	const [count, setCount] = useState(3);
	const path = navState((state) => state.path);

	const current = new Date().getFullYear();
	const diff = current - start;

	const tabs = [];
	for (let i = 0; i < diff + 1; i++) {
		tabs.push(`${current - i}`);
	}

	useEffect(() => {
		if (all) {
			setCount(tabs.length);
		} else {
			setCount(3);
		}
	}, [all, tabs.length]);

	return (
		<nav className="mb-1 sm:mb-2 lg:mb-3">
			<ul className="space-x-1 navmenu submenu flex-wrap">
				<li>
					<Link
						href={type ? `/actions/${type}/` : '/actions/'}
						prefetch={false}
					>
						<a
							data-title="Recent"
							className={
								!path.two || (path.two === type && !path.three)
									? 'active'
									: 'inactive'
							}
						>
							Recent
						</a>
					</Link>
				</li>
				{tabs.slice(0, count).map((tab) => (
					<li key={tab}>
						<Link
							href={
								type ? `/actions/${type}/${tab}/` : `/actions/${tab}/`
							}
							prefetch={false}
						>
							<a
								data-title={tab}
								className={
									path.two === tab || path.three === tab
										? 'active'
										: 'inactive'
								}
							>
								{tab}
							</a>
						</Link>
					</li>
				))}
				<li>
					{all ? (
						<span
							className="inactive font-semibold"
							onClick={() => setAll(false)}
						>
							Hide &uarr;
						</span>
					) : (
						<span
							className="inactive font-semibold"
							onClick={() => setAll(true)}
						>
							Show All &darr;
						</span>
					)}
				</li>
			</ul>
		</nav>
	);
};
