import { ReactNode } from 'react';
import Link from 'next/link';

interface ICustomLink {
	as: string;
	href: string;
	children: string | ReactNode;
}

export const CustomLink = ({ as, href, children }: ICustomLink) => {
	return (
		<Link as={as} href={href} prefetch={false}>
			<a href={href}>{children}</a>
		</Link>
	);
};

interface IExternal {
	url: string;
	text: string | ReactNode;
}

export const External = ({ url, text }: IExternal) => (
	<a href={url} target="_blank" rel="noopener noreferrer" className="bll">
		{text}
	</a>
);
