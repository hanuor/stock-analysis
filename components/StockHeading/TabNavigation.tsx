import { Info } from 'types/Info';
import { useRef, UIEvent, useEffect } from 'react';
import Link from 'next/link';
import { navState } from 'state/navState';
import { menuState } from 'state/menuState';

export const TabNavigation = ({ info }: { info: Info }) => {
	const path = navState((state) => state.path);
	const menuref = useRef<HTMLUListElement>(null);
	const pos = menuState((state) => state.pos);
	const setPos = menuState((state) => state.setPos);

	function handleScroll(e: UIEvent<HTMLUListElement>) {
		if (e) {
			setPos(e.currentTarget.scrollLeft);
		}
	}

	useEffect(() => {
		if (menuref.current && pos) {
			menuref.current.scrollLeft = pos;
		}
	}, [path, pos]);

	return (
		<nav className="border-b-2 border-blue-brand_sharp w-full">
			<ul className="navmenu" ref={menuref} onScroll={handleScroll}>
				<li>
					<Link
						href={`/stocks/${info.symbol}/`}
						prefetch={false}
						scroll={false}
					>
						<a
							className={!path.three ? 'active' : 'inactive'}
							data-title="Overview"
						>
							Overview
						</a>
					</Link>
				</li>
				<li>
					<Link
						href={`/stocks/${info.symbol}/financials/`}
						prefetch={false}
						scroll={false}
					>
						<a
							className={
								path.three == 'financials' ? 'active' : 'inactive'
							}
							data-title="Financials"
						>
							Financials
						</a>
					</Link>
				</li>
				<li>
					<Link
						href={`/stocks/${info.symbol}/statistics/`}
						prefetch={false}
						scroll={false}
					>
						<a
							className={
								path.three == 'statistics' ? 'active' : 'inactive'
							}
							data-title="Statistics"
						>
							Statistics
						</a>
					</Link>
				</li>
				<li>
					<Link
						href={`/stocks/${info.symbol}/company/`}
						prefetch={false}
						scroll={false}
					>
						<a
							className={path.three == 'company' ? 'active' : 'inactive'}
							data-title="Profile"
						>
							Profile
						</a>
					</Link>
				</li>
				{!info.exceptions.hideChart && (
					<li>
						<Link
							href={`/stocks/${info.symbol}/chart/`}
							prefetch={false}
							scroll={false}
						>
							<a
								className={
									path.three == 'chart' ? 'active' : 'inactive'
								}
								data-title="Chart"
							>
								Chart
							</a>
						</Link>
					</li>
				)}
			</ul>
		</nav>
	);
};
