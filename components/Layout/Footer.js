import Link from "next/link";

export default function Footer() {
	return (
		<footer className="mt-auto bg-gray-600 py-7">
			<div className="container max-w-screen-xl text-center text-white">
				<nav>
					<ul className="flex justify-center space-x-4">
						<li><Link href="/">Home</Link></li>
						<li><Link href="/about/">About</Link></li>
					</ul>
				</nav>
			</div>
		</footer>
	);
}