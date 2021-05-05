import Link from "next/link";
import HeaderLogo from "@/components/Header/HeaderLogo";

export default function Header() {
	return (
		<header className="shadow-md py-5">
			<div className="container max-w-screen-xl flex justify-between items-center mx-auto px-4">
				<div className="h-12 w-12">
					<Link href="/"><a><HeaderLogo /></a></Link>
				</div>
				<div>
					<nav>
						<ul className="flex space-x-3">
							<li><Link href="/about/">About</Link></li>
							<li><Link href="/stocks/">Stocks</Link></li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
}