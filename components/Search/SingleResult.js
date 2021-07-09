import Link from 'next/link';

export default function SingleResult({ index, symbol, name, type, setOpen }) {
	let url;
	let tag;

	switch (type) {
		case 's':
			url = `/stocks/${symbol.toLowerCase()}/`;
			tag = 'Stock';
			break;

		case 'e':
			url = `/etf/${symbol.toLowerCase()}/`;
			tag = 'Stock';
			break;
	}

	if (!url) {
		return '';
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
}
