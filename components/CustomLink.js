import Link from 'next/link';

export const CustomLink = ({ as, href, children }) => {
	return (
		<Link as={as} href={href} prefetch={false}>
			<a href={href}>{children}</a>
		</Link>
	);
};

export const External = ({ url, text }) => (
	<a href={url} target="_blank" rel="noopener noreferrer" className="bll">
		{text}
	</a>
);
