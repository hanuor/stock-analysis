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

const LevelOne = ({ path }: { path: PathObject }) => {
	if (path.one) {
		if (path.one === 'ipos') {
			if (path.two) {
				return (
					<li>
						<Link href="/ipos/" prefetch={false}>
							<a>IPOs</a>
						</Link>
					</li>
				);
			}
			return <li>{'IPOs'}</li>;
		}
		if (path.one === 'etf') {
			if (path.two) {
				return (
					<li>
						<Link href="/etf/" prefetch={false}>
							<a>ETF</a>
						</Link>
					</li>
				);
			}
			return <li>{'ETF'}</li>;
		}
		if (path.two) {
			return (
				<li>
					<Link href={`/${path.one}/`} prefetch={false}>
						<a>{capitalize(path.one)}</a>
					</Link>
				</li>
			);
		}
		return <li>{capitalize(path.one)}</li>;
	}
	return null;
};

const LevelTwo = ({ path }: { path: PathObject }) => {
	if (path.two) {
		if (path.one === 'stocks') {
			if (path.three) {
				return (
					<li>
						<Link
							href={`/stocks/${path.two.toLowerCase()}/`}
							prefetch={false}
						>
							<a>{path.two.toUpperCase()}</a>
						</Link>
					</li>
				);
			}
			return <li>{path.two.toUpperCase()}</li>;
		}
		if (path.one === 'etf') {
			if (path.three) {
				return (
					<li>
						<Link
							href={`/etf/${path.two.toLowerCase()}/`}
							prefetch={false}
						>
							<a>{path.two.toUpperCase()}</a>
						</Link>
					</li>
				);
			}
			return <li>{path.two.toUpperCase()}</li>;
		}
		return <li>{formatPageTitle(path.two)}</li>;
	}
	return null;
};

const LevelThree = ({ path }: { path: PathObject }) => {
	if (path.three) {
		if (path.four) {
			return (
				<li>
					<Link
						href={`/${path.one}/${path.two}/${path.three}`}
						prefetch={false}
					>
						<a>{capitalize(path.three)}</a>
					</Link>
				</li>
			);
		}
		return <li>{formatPageTitle(path.three)}</li>;
	}
	return null;
};

const LevelFour = ({ path }: { path: PathObject }) => {
	if (path.four) {
		return <li>{formatPageTitle(path.four)}</li>;
	}
	return null;
};

export const Breadcrumbs = () => {
	const path = navState((state) => state.path);

	return (
		<nav aria-label="breadcrumbs" className="breadcrumbs">
			<ol>
				<li>
					<Link href="/" prefetch={false}>
						<a>Home</a>
					</Link>
				</li>
				{path.one && <LevelOne path={path} />}
				{path.two && <LevelTwo path={path} />}
				{path.three && <LevelThree path={path} />}
				{path.four && <LevelFour path={path} />}
			</ol>
		</nav>
	);
};
