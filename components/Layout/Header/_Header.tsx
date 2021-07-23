import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { HeaderLogo } from 'components/Layout/Header/HeaderLogo';
import { HeaderLogoFull } from 'components/Layout/Header/HeaderLogoFull';
import { HeaderSearch } from 'components/Layout/Header/HeaderSearch';
import { HeaderLogin } from 'components/Layout/Header/HeaderLogin';

import {
	HeaderNavigation,
	HamburgerIcon,
	CloseIcon,
} from 'components/Layout/Header/HeaderNavigation';

import { navState } from 'state/navState';

export const Header = () => {
	const noderef = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false);
	const [menu, setMenu] = useState('hidden lg:flex');
	const path = navState((state) => state.path);
	console.log(path);

	function clickMenu() {
		setOpen((open) => !open);
	}

	function clickOutside(e: MouseEvent) {
		const node = noderef.current ?? null;
		const doc = document.querySelector('#menu-toggle') ?? null;

		if (
			(node && node.contains(e.target as Node)) ||
			(doc && doc.contains(e.target as Node))
		) {
			return;
		}
		setOpen(false);
	}

	useEffect(() => {
		if (open) {
			setMenu('block bg-white shadow-xl absolute w-full');
			document.addEventListener('mousedown', clickOutside);
		} else {
			setMenu('hidden');
			document.removeEventListener('mousedown', clickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', clickOutside);
		};
	}, [open]);

	return (
		<header className="bg-white shadow-md sticky landscape:static landscape:md:sticky top-0 z-50">
			<a href="#main" className="skip-nav">
				Skip to main content
			</a>
			<div className="mx-auto px-3 lg:px-4 flex items-center py-2 space-x-4 lg:space-x-8 xl:max-w-screen-xl">
				<div>
					<Link href="/" prefetch={false}>
						<a className="flex" aria-label="Stock Analysis home page">
							<HeaderLogo className="h-8 w-8 lg:hidden" />
							<HeaderLogoFull />
						</a>
					</Link>
				</div>
				<div className="flex-grow">
					<form role="search">
						<HeaderSearch />
					</form>
				</div>
				<div className="lg:hidden">
					<button
						type="button"
						id="menu-toggle"
						className={`flex flex-col items-center focus:outline-none focus-visible:outline-none ${
							open && 'text-blue-800'
						}`}
						onClick={clickMenu}
					>
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
				<div ref={noderef} className={menu}>
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
};
