import Link from "next/link";

export default function HeaderNavigation({ device }) {
	const menuDesktop = "flex flex-row space-x-5";
	const menuMobile = "flex flex-col space-y-3 py-3 px-6";

	return (
		<nav>
			<ul className={device == "desktop" ? menuDesktop : menuMobile}>
				<li>
					<Link href="/stocks/">
						<a>Stocks</a>
					</Link>
				</li>
				<li>
					<Link href="/blog/">
						<a>IPOs</a>
					</Link>
				</li>
				<li>
					<Link href="/about/">
						<a>ETFs</a>
					</Link>
				</li>
				<li>
					<Link href="/news/">
						<a>News</a>
					</Link>
				</li>
				<li>
					<Link href="/login/">
						<a>Login</a>
					</Link>
				</li>
				<li>
					<Link href="/news/">
						<a>My Account</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
}
