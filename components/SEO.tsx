import Head from 'next/head';

interface ISEO {
	title: string;
	description?: string;
	canonical: string;
	noindex?: boolean;
	image?: string;
}

export const SEO = ({
	title,
	description,
	canonical,
	noindex = false,
	image,
}: ISEO) => {
	const seoTitle =
		title === 'Stock Analysis | Free Online Stock Information for Investors'
			? title
			: title + ' | Stock Analysis';

	const metaRobots = noindex
		? 'noindex, nofollow'
		: 'max-snippet:-1,max-image-preview:large,max-video-preview:-1';

	const canonicalUrl = 'https://stockanalysis.com/' + canonical;

	const featuredImage = image
		? `https://stockanalysis.com${image}`
		: 'https://stockanalysis.com/img/bear-vs-bull.jpg';

	return (
		<Head>
			<title>{seoTitle}</title>
			{description && <meta name="description" content={description} />}

			<meta name="robots" content={metaRobots} />
			<link rel="canonical" href={canonicalUrl} />

			<meta property="og:image" content={featuredImage} />
			<meta property="og:title" content={seoTitle} />
			{description && (
				<meta property="og:description" content={description} />
			)}
			<meta property="og:url" content={canonicalUrl} />
			<meta property="og:site_name" content="Stock Analysis" />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content="@stock_analysisx" />
			<meta name="twitter:title" content={seoTitle} />
			{description && (
				<meta name="twitter:description" content={description} />
			)}
			<meta name="twitter:image" content={featuredImage} />
			<link
				rel="shortcut icon"
				href="https://stockanalysis.com/favicon.ico"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="https://stockanalysis.com/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="https://stockanalysis.com/favicon-16x16.png"
			/>
			<link
				rel="apple-touch-icon"
				href="https://stockanalysis.com/apple-touch-icon.png"
				sizes="180x180"
			/>
		</Head>
	);
};
