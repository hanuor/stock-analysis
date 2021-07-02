import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import HeaderLogo from 'components/Layout/Header/HeaderLogo';
import HeaderLogoFull from 'components/Layout/Header/HeaderLogoFull';
import HeaderSearch from 'components/Layout/Header/HeaderSearch';
import HeaderLogin from 'components/Layout/Header/HeaderLogin';

import {
	HeaderNavigation,
	HamburgerIcon,
	CloseIcon,
} from 'components/Layout/Header/HeaderNavigation';

export default function Header() {
	const node = useRef();
	const [open, setOpen] = useState(false);
	const [menu, setMenu] = useState('hidden lg:flex');

	function clickMenu() {
		setOpen((open) => !open);
	}

	function clickOutside(e) {
		if (
			node.current.contains(e.target) ||
			document.querySelector('#menu-toggle').contains(e.target)
		) {
			return;
		}
		setOpen(false);
	}

	useEffect(
		function () {
			if (open) {
				setMenu('block bg-white shadow-xl absolute w-full');
				document.addEventListener('mousedown', clickOutside);
			} else {
				setMenu('hidden');
				document.removeEventListener('mousedown', clickOutside);
			}

			return function () {
				document.removeEventListener('mousedown', clickOutside);
			};
		},
		[open]
	);

	return (
		<header className="bg-white shadow-md sticky top-0 z-50">
			<div className="mx-auto px-3 lg:px-4 flex items-center py-2 space-x-4 lg:space-x-8 xl:max-w-screen-xl">
				<div>
					<Link href="/" className="flex">
						<a>
							<HeaderLogo className="h-8 w-8 lg:hidden" />
							<HeaderLogoFull />
						</a>
					</Link>
				</div>
				<div className="flex-grow">
					<HeaderSearch />
				</div>
				<div className="lg:hidden">
					<button
						type="button"
						id="menu-toggle"
						className={`flex flex-col items-center focus:outline-none focus-visible:outline-none ${
							open && 'text-blue-800'
						}`}
						onClick={clickMenu}>
						{open ? <CloseIcon /> : <HamburgerIcon />}
						<span className="text-xs">{open ? 'Close' : 'Menu'}</span>
					</button>
				</div>
				<div className="hidden lg:flex">
					<HeaderNavigation device="desktop" />
				</div>
				<div className="hidden lg:flex">
					<HeaderLogin />
				</div>
			</div>
			<div className="relative lg:hidden">
				<div ref={node} className={menu}>
					{open && (
						<>
							<HeaderNavigation device="mobile" />
							<HeaderLogin />
						</>
					)}
				</div>
			</div>
		</header>
	);
}
