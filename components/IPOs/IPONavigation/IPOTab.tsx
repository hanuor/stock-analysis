import Link from 'next/link';

type TabTypes = {
	url: string;
	title: string;
	css: 'active' | 'inactive';
};

export function IPOTab({ url, title, css }: TabTypes) {
	return (
		<li>
			<Link href={url} prefetch={false}>
				<a data-title={title} className={css}>
					{title}
				</a>
			</Link>
		</li>
	);
}
