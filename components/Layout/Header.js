import Link from "next/link";
import HeaderLogo from "@/components/Layout/Header/HeaderLogo";
import HeaderSearch from "@/Layout/Header/HeaderSearch";
import HeaderNavigation from "@/Layout/Header/HeaderNavigation";

export default function Header() {
	return (
		<header className="shadow-md py-2">
			<div className="container max-w-screen-xl flex justify-between items-center mx-auto px-3">
				<div className="h-8 w-8">
					<Link href="/" className="flex">
						<a>
							<HeaderLogo />
						</a>
					</Link>
				</div>
				<div>
					<HeaderSearch />
				</div>
				<div>
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
				</div>
			</div>
		</header>
	);
}
