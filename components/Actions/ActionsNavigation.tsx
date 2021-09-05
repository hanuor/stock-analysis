import { useRef, UIEvent, useEffect } from 'react';
import Link from 'next/link';
import { navState } from 'state/navState';
import { actionsState } from 'state/actionsState';

export const ActionsNavigation = () => {
	const path = navState((state) => state.path);
	const menuref = useRef<HTMLUListElement>(null);
	const pos = actionsState((state) => state.pos);
	const setPos = actionsState((state) => state.setPos);

	function handleScroll(e: UIEvent<HTMLUListElement>) {
		if (e && e.currentTarget.scrollLeft !== pos) {
			setPos(e.currentTarget.scrollLeft);
		}
	}

	useEffect(() => {
		if (menuref.current && menuref.current.scrollLeft !== pos) {
			menuref.current.scrollLeft = pos;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const tabs = [
		'listed',
		'delisted',
		'splits',
		'changes',
		'spinoffs',
		'bankruptcies',
		'acquisitions',
	];

	return (
		<nav className="border-b-[3px] border-blue-brand_sharp">
			<ul className="navmenu" ref={menuref} onScroll={handleScroll}>
				<li>
					<Link
						href={`/actions/${path.three ? `${path.three}/` : ''}`}
						prefetch={false}
					>
						<a
							data-title="Actions"
							className={
								!path.two || path.two.includes('20')
									? 'active'
									: 'inactive'
							}
						>
							Actions
						</a>
					</Link>
				</li>
				{tabs.map((tab) => {
					let append = '';
					const last = path.three ?? path.two ?? path.one;
					if (
						(last?.includes('20') || last?.includes('19')) &&
						path.two !== tab
					) {
						append = `${last}/`;
					}

					return (
						<li key={tab}>
							<Link href={`/actions/${tab}/${append}`} prefetch={false}>
								<a
									data-title={tab[0].toUpperCase() + tab.slice(1)}
									className={path.two === tab ? 'active' : 'inactive'}
								>
									{tab[0].toUpperCase() + tab.slice(1)}
								</a>
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};
