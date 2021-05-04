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
					Stocks | ETFs | IPOs
				</div>
			</div>
		</header>
	);
}