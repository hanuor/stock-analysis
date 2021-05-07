import Link from "next/link";

export default function HeaderNavigation() {
	return (
		<nav>
			<ul className="flex space-x-4">
				<li><Link href="/stocks/"><a>Stocks</a></Link></li>
				<li><Link href="/blog/"><a>Blog</a></Link></li>
				<li><Link href="/about/"><a>About</a></Link></li>
			</ul>
		</nav>
	);
}