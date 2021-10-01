import Link from 'next/link';

interface Props {
	device: string;
	setOpen: (open: boolean) => void;
}

export const HeaderNavigation = ({ device, setOpen }: Props) => {
	const menuDesktop = 'flex flex-row space-x-4 xl:space-x-5 text-lg';
	const menuMobile =
		'flex flex-col text-xl divide-y divide-gray-200 border-t border-gray-200 bg-white relative z-50';

	return (
		<>
			<nav>
				<ul className={device == 'desktop' ? menuDesktop : menuMobile}>
					<li>
						<Link href="/stocks/" prefetch={false}>
							<a
								className="block lg:inline pl-5 pr-8 py-2 lg:p-0 hover:text-blue-700"
								onClick={() => setOpen(false)}
							>
								Stocks
							</a>
						</Link>
					</li>
					<li>
						<Link href="/stock-screener/" prefetch={false}>
							<a
								className="block lg:inline pl-5 pr-8 py-2 lg:p-0 hover:text-blue-700"
								onClick={() => setOpen(false)}
							>
								Screener
							</a>
						</Link>
					</li>
					<li>
						<Link href="/ipos/" prefetch={false}>
							<a
								className="block lg:inline pl-5 pr-8 py-2 lg:p-0 hover:text-blue-700"
								onClick={() => setOpen(false)}
							>
								IPOs
							</a>
						</Link>
					</li>
					<li>
						<Link href="/etf/" prefetch={false}>
							<a
								className="block lg:inline pl-5 pr-8 py-2 lg:p-0 hover:text-blue-700"
								onClick={() => setOpen(false)}
							>
								ETFs
							</a>
						</Link>
					</li>
					<li>
						<Link href="/news/" prefetch={false}>
							<a
								className="block lg:inline pl-5 pr-8 py-2 lg:p-0 hover:text-blue-700"
								onClick={() => setOpen(false)}
							>
								News
							</a>
						</Link>
					</li>
					<li>
						<Link href="/actions/" prefetch={false}>
							<a
								className="block lg:inline pl-5 pr-8 py-2 lg:p-0 hover:text-blue-700"
								onClick={() => setOpen(false)}
							>
								Actions
							</a>
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
};
