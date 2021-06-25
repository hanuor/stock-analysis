import Link from 'next/link';

const Button = ({ url, text, className }) => {
	let classes =
		'inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-lg font-medium rounded-sm shadow-sm text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4';
	if (className) {
		classes = classes + ' ' + className;
	}

	return (
		<Link href={url}>
			<a className={classes}>{text}</a>
		</Link>
	);
};

export default Button;
