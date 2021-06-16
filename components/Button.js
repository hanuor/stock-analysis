import Link from 'next/link';

const Button = ({ url, text }) => {
	return (
		<Link href={url}>
			<a className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-lg font-medium rounded-sm shadow-sm text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4">
				{text}
			</a>
		</Link>
	);
};

export default Button;
