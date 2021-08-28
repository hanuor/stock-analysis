import { useRef, UIEvent, useEffect } from 'react';
import { menuState } from 'state/menuState';
import { Tab } from './Tab';

export const TabNavigation = ({
	symbol,
	hideChart,
}: {
	symbol: string;
	hideChart: boolean;
}) => {
	const menuref = useRef<HTMLUListElement>(null);
	const pos = menuState((state) => state.pos);
	const setPos = menuState((state) => state.setPos);

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

	return (
		<nav className="border-b-2 border-blue-brand_sharp w-full">
			<ul
				className="navmenu"
				ref={menuref}
				onScroll={(e) => handleScroll(e)}
			>
				<Tab symbol={symbol} title="Overview" append="" />
				<Tab symbol={symbol} title="Financials" append="financials" />
				<Tab symbol={symbol} title="Statistics" append="statistics" />
				<Tab symbol={symbol} title="Profile" append="company" />
				{!hideChart && <Tab symbol={symbol} title="Chart" append="chart" />}
			</ul>
		</nav>
	);
};
