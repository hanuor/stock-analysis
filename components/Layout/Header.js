import Link from "next/link";
import HeaderLogo from "@/components/Layout/Header/HeaderLogo";
import HeaderLogoFull from "@/components/Layout/Header/HeaderLogoFull";
import HeaderSearch from "@/Layout/Header/HeaderSearch";
import HeaderNavigation from "@/Layout/Header/HeaderNavigation";
import { useEffect, useState, useRef } from "react";

export default function Header() {
	const node = useRef();
	const [open, setOpen] = useState(false);
	const [menu, setMenu] = useState("hidden lg:flex");

	function clickMenu() {
		setOpen((open) => !open);
	}

	function clickOutside(e) {
		if (
			node.current.contains(e.target) ||
			document.querySelector("#menu-toggle").contains(e.target)
		) {
			return;
		}
		setOpen(false);
	}

	useEffect(
		function () {
			if (open) {
				setMenu("block bg-white shadow-xl absolute top-0 right-0");
				document.addEventListener("mousedown", clickOutside);
			} else {
				setMenu("hidden");
				document.removeEventListener("mousedown", clickOutside);
			}

			return function () {
				document.removeEventListener("mousedown", clickOutside);
			};
		},
		[open]
	);

	return (
		<header className="bg-white lg:shadow-md lg:py-2 sticky top-0">
			<div className="shadow-md py-2 lg:shadow-none lg:py-0 container max-w-screen-xl flex items-center mx-auto px-3 lg:px-4 space-x-4 lg:space-x-6">
				<div>
					<Link href="/" className="flex">
						<a>
							<HeaderLogo />
							<HeaderLogoFull />
						</a>
					</Link>
				</div>
				<div className="flex-grow">
					<HeaderSearch />
				</div>
				<button
					id="menu-toggle"
					className="flex flex-col items-center lg:hidden"
					onClick={clickMenu}>
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
					<span className="text-xs">Menu</span>
				</button>
				<div className="hidden lg:flex">
					<HeaderNavigation device="desktop" />
				</div>
			</div>
			<div className="relative lg:hidden">
				<div ref={node} className={menu}>
					{open && <HeaderNavigation device="mobile" />}
				</div>
			</div>
		</header>
	);
}
