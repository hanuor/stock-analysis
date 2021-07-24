import Link from 'next/link';
import { navState } from 'state/navState';

type PathObject = {
	one: string | null;
	two: string | null;
	three: string | null;
	four: string | null;
};

const capitalize = (word: string) =>
	word.charAt(0).toUpperCase() + word.slice(1);

const validBit = (bit: string) =>
	bit.charAt(0) !== '#' && bit.charAt(0) !== '?' && bit.charAt(0) !== '%';

const formatPageTitle = (word: string) => {
	const split = word.split('-');
	if (split.length === 1) {
		return split[0].charAt(0).toUpperCase() + split[0].slice(1);
	} else {
		let newstr = '';
		split.forEach((element) => {
			newstr += element.charAt(0).toUpperCase() + element.slice(1) + ' ';
		});
		return newstr.trim();
	}
};

const Break = () => <span className="px-1 sm:px-2">&raquo;</span>;

const LevelOne = ({ path }: { path: PathObject }) => {
	if (path.one && validBit(path.one)) {
		if (path.one === 'ipos') {
			if (path.two) {
				return (
					<Link href="/ipos/" prefetch={false}>
						<a>IPOs</a>
					</Link>
				);
			}
			return <>{'IPOs'}</>;
		}
		if (path.one === 'etf') {
			if (path.two) {
				return (
					<Link href="/etf/" prefetch={false}>
						<a>ETF</a>
					</Link>
				);
			}
			return <>{'ETF'}</>;
		}
		if (path.two) {
			return (
				<Link href={`/${path.one}/`} prefetch={false}>
					<a>{capitalize(path.one)}</a>
				</Link>
			);
		}
		return <>{capitalize(path.one)}</>;
	}
	return null;
};

const LevelTwo = ({ path }: { path: PathObject }) => {
	if (path.two && validBit(path.two)) {
		if (path.one === 'stocks') {
			if (path.three) {
				return (
					<Link
						href={`/stocks/${path.two.toLowerCase()}/`}
						prefetch={false}
					>
						<a>{path.two.toUpperCase()}</a>
					</Link>
				);
			}
			return <>{path.two.toUpperCase()}</>;
		}
		if (path.one === 'etf') {
			if (path.three) {
				return (
					<Link href={`/etf/${path.two.toLowerCase()}/`} prefetch={false}>
						<a>{path.two.toUpperCase()}</a>
					</Link>
				);
			}
			return <>{path.two.toUpperCase()}</>;
		}
		return <>{formatPageTitle(path.two)}</>;
	}
	return null;
};

const LevelThree = ({ path }: { path: PathObject }) => {
	if (path.three && validBit(path.three)) {
		if (path.four) {
			return (
				<Link
					href={`/${path.one}/${path.two}/${path.three}`}
					prefetch={false}
				>
					<a>{capitalize(path.three)}</a>
				</Link>
			);
		}
		return <>{formatPageTitle(path.three)}</>;
	}
	return null;
};

const LevelFour = ({ path }: { path: PathObject }) => {
	if (path.four && validBit(path.four)) {
		return <>{formatPageTitle(path.four)}</>;
	}
	return null;
};

export const Breadcrumbs = () => {
	const path = navState((state) => state.path);

	return (
		<nav>
			<ol className="flex flex-wrap text-sm sm:text-small text-gray-600 sm:mb-0.5">
				<li>
					<Link href="/" prefetch={false}>
						<a>Home</a>
					</Link>
				</li>
				{path.one && (
					<li>
						<Break />
						<LevelOne path={path} />
					</li>
				)}
				{path.two && (
					<li>
						<Break />
						<LevelTwo path={path} />
					</li>
				)}
				{path.three && (
					<li>
						<Break />
						<LevelThree path={path} />
					</li>
				)}
				{path.four && (
					<li>
						<Break />
						<LevelFour path={path} />
					</li>
				)}
			</ol>
		</nav>
	);
};
