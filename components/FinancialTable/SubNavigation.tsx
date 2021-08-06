import Link from 'next/link';
import { financialsState } from 'state/financialsState';
import { Info } from 'types/Info';

// styles
const common =
	'block py-2 sm:py-2 px-2 xs:px-2.5 sm:px-4 lg:px-5 cursor-pointer whitespace-nowrap';
const inactive = common + ' bll';
const active = common + ' text-gray-900 bg-[#eee] font-semibold';

interface Props {
	info: Info;
	statement: string;
}

export const SubNavigation = ({ info, statement }: Props) => {
	return (
		<div className="flex flex-col md:flex-row md:justify-between mb-2 md:mb-3 space-y-3 md:space-y-0">
			<Statement info={info} statement={statement} />
			<Period />
		</div>
	);
};

function Statement({ info, statement }: Props) {
	return (
		<nav>
			<ul className="w-full navmenu submenu">
				<li>
					<Link
						href={`/stocks/${info.symbol}/financials/`}
						prefetch={false}
						scroll={false}
					>
						<a
							className={
								statement == 'income_statement' ? active : inactive
							}
							data-title="Income"
						>
							Income
						</a>
					</Link>
				</li>
				<li>
					<Link
						href={`/stocks/${info.symbol}/financials/balance-sheet`}
						prefetch={false}
						scroll={false}
					>
						<a
							className={
								statement == 'balance_sheet' ? active : inactive
							}
							data-title="Balance Sheet"
						>
							Balance Sheet
						</a>
					</Link>
				</li>
				<li>
					<Link
						href={`/stocks/${info.symbol}/financials/cash-flow-statement/`}
						prefetch={false}
						scroll={false}
					>
						<a
							className={
								statement == 'cash_flow_statement' ? active : inactive
							}
							data-title="Cash Flow"
						>
							Cash Flow
						</a>
					</Link>
				</li>
				{!info.exceptions.hideRatios && (
					<li>
						<Link
							href={`/stocks/${info.symbol}/financials/ratios/`}
							prefetch={false}
							scroll={false}
						>
							<a
								className={statement == 'ratios' ? active : inactive}
								data-title="Ratios"
							>
								Ratios
							</a>
						</Link>
					</li>
				)}
			</ul>
		</nav>
	);
}

function Period() {
	const range = financialsState((state) => state.range);
	const setRange = financialsState((state) => state.setRange);

	return (
		<nav>
			<ul className="flex flex-row w-full overflow-auto navmenu submenu">
				<li>
					<span
						className={range == 'annual' ? active : inactive}
						onClick={function () {
							setRange('annual');
						}}
						data-title="Annual"
					>
						Annual
					</span>
				</li>
				<li>
					<span
						className={range == 'quarterly' ? active : inactive}
						onClick={function () {
							if (range !== 'quarterly') {
								setRange('quarterly');
							}
						}}
						data-title="Quarterly"
					>
						Quarterly
					</span>
				</li>
				<li>
					<span
						className={range == 'trailing' ? active : inactive}
						onClick={function () {
							setRange('trailing');
						}}
						data-title="Trailing"
					>
						Trailing
					</span>
				</li>
			</ul>
		</nav>
	);
}
