import Link from 'next/link';

interface Props {
	url: string;
	text: string;
	className?: string;
	id?: string;
}

export const Button = ({ url, text, className, id }: Props) => {
	let classes =
		'inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-lg font-medium rounded-sm shadow-sm text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4';
	if (className) {
		classes = classes + ' ' + className;
	}

	return (
		<Link href={url} prefetch={false}>
			<a className={classes} id={id}>
				{text}
			</a>
		</Link>
	);
};
