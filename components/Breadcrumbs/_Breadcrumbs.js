import navState from '@State/navState';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Break = () => <span className="px-2">&raquo;</span>;
const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const formatPageTitle = (word) => {
	let split = word.split('-');
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

const One = ({ one, two }) => {
	if (one === 'ipos') {
		if (two) {
			return (
				<Link href="/ipos/">
					<a>IPOs</a>
				</Link>
			);
		}
		return 'IPOs';
	}
	return capitalize(one);
};

const formatTwo = (two) => {
	return formatPageTitle(two);
};

const _Breadcrumbs = () => {
	const router = useRouter();
	const path = navState((state) => state.path);
	const setPath = navState((state) => state.setPath);

	useEffect(() => {
		let route = router.asPath;
		let split = route.split('/');
		let one = split[1] || null;
		let two = split[2] || null;
		let three = split[3] || null;

		setPath({
			one,
			two,
			three,
		});
	}, [router.asPath, setPath]);

	return (
		<nav>
			<ol className="flex text-sm sm:text-base text-gray-600 mb-0.5">
				<li>
					<Link href="/">
						<a>Home</a>
					</Link>
				</li>
				{path.one && (
					<li>
						<Break />
						<One one={path.one} two={path.two} />
					</li>
				)}
				{path.two && (
					<li>
						<Break />
						{formatTwo(path.two)}
					</li>
				)}
			</ol>
		</nav>
	);
};

export default _Breadcrumbs;
