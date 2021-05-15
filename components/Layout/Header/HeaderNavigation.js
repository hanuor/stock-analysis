import Link from "next/link";

export function HeaderNavigation({ device }) {
	const menuDesktop = "flex flex-row space-x-5 text-lg";
	const menuMobile =
		"flex flex-col text-xl divide-y divide-gray-200 border-t border-gray-200";

	return (
		<>
			<nav>
				<ul className={device == "desktop" ? menuDesktop : menuMobile}>
					<li className="pl-5 pr-8 py-2 lg:p-0 hover:text-blue-700">
						<Link href="/stocks/">
							<a>Stocks</a>
						</Link>
					</li>
					<li className="pl-5 pr-8 py-2 lg:p-0 hover:text-blue-700">
						<Link href="/blog/">
							<a>IPOs</a>
						</Link>
					</li>
					<li className="pl-5 pr-8 py-2 lg:p-0 hover:text-blue-700">
						<Link href="/about/">
							<a>ETFs</a>
						</Link>
					</li>
					<li className="pl-5 pr-8 py-2 lg:p-0 hover:text-blue-700">
						<Link href="/news/">
							<a>News</a>
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
}

export function LoginNav() {
	return (
		<div className="flex flex-row text-center font-semibold lg:block lg:space-x-1 text-lg">
			<span className="flex-1 py-2 px-3 text-white bg-gray-500 lg:flex-none lg:bg-white lg:text-black lg:font-normal hover:text-blue-700">
				<Link href="/login/">
					<a>Log In</a>
				</Link>
			</span>
			<span className="flex-1 py-2 px-4 bg-blue-500 lg:py-[0.4rem] lg:flex-none lg:px-3 text-white lg:rounded-sm lg:font-normal hover:bg-blue-600">
				<Link href="/news/">
					<a>Free Trial</a>
				</Link>
			</span>
		</div>
	);
}

export function HamburgerIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor">
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M4 6h16M4 12h16M4 18h16"
			/>
		</svg>
	);
}

export function CloseIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor">
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M6 18L18 6M6 6l12 12"
			/>
		</svg>
	);
}
