import Head from 'next/head';

interface ISEO {
	title: string;
	description?: string;
}

export const SEO = ({ title, description }: ISEO) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
		</Head>
	);
};
