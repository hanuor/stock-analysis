import Link from 'next/link';

export const CustomLink = ({ as, href, ...otherProps }) => (
	<Link as={as} href={href}>
		<a {...otherProps} />
	</Link>
);

export const External = ({ url, text }) => (
	<a href={url} target="_blank" rel="noopener noreferrer">
		{text}
	</a>
);
