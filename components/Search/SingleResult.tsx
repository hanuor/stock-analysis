import { navState } from 'state/navState';
import Link from 'next/link';

interface SearchItem {
	s: string;
	n: string;
	t: string;
}

interface Props {
	index: number;
	result: SearchItem;
	setOpen: (open: boolean) => void;
}

export const SingleResult = ({ index, result, setOpen }: Props) => {
	const path = navState((state) => state.path);
	const symbol = result.s;
	const name = result.n;
	const type = result.t;

	let url;
	let tag;

	switch (type) {
		case 's':
			url = symbol.includes('.')
				? `/stocks/${symbol.toLowerCase()}`
				: `/stocks/${symbol.toLowerCase()}/`;
			tag = 'Stock';
			break;

		case 'e':
			url = `/etf/${symbol.toLowerCase()}/`;
			tag = 'Stock';
			break;
	}

	if (!url) {
		return <></>;
	} else {
		if (path.three) {
			url = url.includes('.') ? url + '/' : url;
			switch (path.three) {
				case 'chart':
					url = `${url}chart/`;
					break;

				case 'financials':
					{
						if (type === 's') {
							switch (path.four) {
								case 'balance-sheet':
									url = `${url}financials/balance-sheet/`;
									break;

								case 'cash-flow-statement':
									url = `${url}financials/cash-flow-statement/`;
									break;

								case 'ratios':
									url = `${url}financials/ratios/`;
									break;

								default:
									url = `${url}financials/`;
									break;
							}
						}
					}
					break;

				case 'company':
					if (type === 's') {
						url = `${url}company/`;
					}
					break;

				case 'statistics':
					if (type === 's') {
						url = `${url}statistics/`;
					}
					break;

				case 'holdings':
					if (type === 'e') {
						url = `${url}holdings/`;
					}
					break;

				case 'dividend':
					url = `${url}dividend/`;
					break;
			}
		}
		if (path.four) {
		}
	}

	let searchResultStyles =
		'flex flex-row items-center gap-x-1 sm:gap-x-2 py-1.5 px-2 sm:px-3 hover:bg-gray-100 transition duration-100';
	if (index === 0) {
		searchResultStyles += ' activeresult';
	}

	return (
		<li className="first:border-t border-b last:border-none border-gray-200">
			<Link href={url} prefetch={false}>
				<a
					data-num={index + 1}
					className={searchResultStyles}
					onClick={() => setOpen(false)}
				>
					<span className="min-w-[3rem]">{symbol}</span>
					<span className="flex-grow">{name}</span>
					<span className="hidden sm:block text-sm">{tag}</span>
				</a>
			</Link>
		</li>
	);
};
