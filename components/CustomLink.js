import Link from 'next/link';

export const CustomLink = ({ as, href, children }) => {
	return (
		<Link as={as} href={href}>
			<a href={href}>{children}</a>
		</Link>
	);
};

export const External = ({ url, text }) => (
	<a href={url} target="_blank" rel="noopener noreferrer" className="bll">
		{text}
	</a>
);

export default CustomLink;
