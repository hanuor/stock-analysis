import Link from 'next/link';
import { validateUrlBit } from 'functions/validation';

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

function Li({ href, text }: { href: string; text: string }) {
	return (
		<li>
			<Link href={href} prefetch={false}>
				<a>{text}</a>
			</Link>
		</li>
	);
}

const LevelOne = ({ path }: { path: PathObject }) => {
	if (path.one) {
		if (path.one === 'ipos') {
			if (path.two) {
				return <Li href="/ipos/" text="IPOs" />;
			}
			return <li>{'IPOs'}</li>;
		}
		if (path.one === 'etf') {
			if (path.two) {
				return <Li href="/etf/" text="ETF" />;
			}
			return <li>{'ETF'}</li>;
		}
		if (path.one === 'stock-screener') {
			return <li>Stock Screener</li>;
		}
		if (path.two) {
			return <Li href={`/${path.one}/`} text={capitalize(path.one)} />;
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
					<Li
						href={`/stocks/${path.two.toLowerCase()}/`}
						text={path.two.toUpperCase()}
					/>
				);
			}
			return <li>{path.two.toUpperCase()}</li>;
		}
		if (path.one === 'etf') {
			if (path.three) {
				return (
					<Li
						href={`/etf/${path.two.toLowerCase()}/`}
						text={path.two.toUpperCase()}
					/>
				);
			}
			return <li>{path.two.toUpperCase()}</li>;
		}
		if (path.one === 'actions') {
			if (path.three) {
				return (
					<Li
						href={`/actions/${path.two.toLowerCase()}/`}
						text={formatPageTitle(path.two)}
					/>
				);
			}
		}
		return <li>{formatPageTitle(path.two)}</li>;
	}
	return null;
};

const LevelThree = ({ path }: { path: PathObject }) => {
	if (path.three) {
		if (path.four) {
			return (
				<Li
					href={`/${path.one}/${path.two}/${path.three}`}
					text={capitalize(path.three)}
				/>
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

export const Breadcrumbs = ({ url }: { url: string }) => {
	if (!url) {
		return null;
	}

	const split = url.split('/');
	const one = validateUrlBit(split[1]);
	const two = validateUrlBit(split[2]);
	const three = validateUrlBit(split[3]);
	const four = validateUrlBit(split[4]);

	const path = { one, two, three, four };

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
