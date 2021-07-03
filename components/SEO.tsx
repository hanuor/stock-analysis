import Head from 'next/head';

interface ISEO {
	title: string;
	description?: string;
	canonical: string;
	noindex?: boolean;
}

export const SEO = ({
	title,
	description,
	canonical,
	noindex = false,
}: ISEO) => {
	return (
		<Head>
			<title>{title}</title>
			{description && <meta name="description" content={description} />}

			<meta
				name="robots"
				content={
					!noindex
						? 'max-snippet:-1,max-image-preview:large,max-video-preview:-1'
						: 'noindex, nofollow'
				}
			/>

			<link
				rel="canonical"
				href={'https://stockanalysis.com/' + canonical}
			/>
		</Head>
	);
};
