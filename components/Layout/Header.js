import Link from "next/link";
import HeaderLogo from "@/components/Layout/Header/HeaderLogoFull";
import HeaderSearch from "@/Layout/Header/HeaderSearch";
import HeaderNavigation from "@/Layout/Header/HeaderNavigation";
import HeaderLogin from "@/Layout/Header/HeaderLogin";

export default function Header() {
	return (
		<header className="shadow-md py-5">
			<div className="container max-w-screen-xl flex justify-between items-center mx-auto px-4">
				<div className="w-40">
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
					<HeaderNavigation />
				</div>
				<div>
					<HeaderLogin />
				</div>
			</div>
		</header>
	);
}
