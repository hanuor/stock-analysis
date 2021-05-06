import Link from "next/link";

export default function HeaderNavigation() {
	return (
		<nav>
			<ul className="flex space-x-4">
				<li><Link href="/stocks/">Stocks</Link></li>
				<li><Link href="/blog/">Blog</Link></li>
				<li><Link href="/about/">About</Link></li>
			</ul>
		</nav>
	);
}