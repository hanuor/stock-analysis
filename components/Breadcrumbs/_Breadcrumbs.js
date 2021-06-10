import navState from '@State/navState';
import Link from 'next/link';

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
	const path = navState((state) => state.path);

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
