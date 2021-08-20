import { GetStaticProps, GetStaticPaths } from 'next';
import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import matter from 'gray-matter';
import { ArticleLayout } from 'components/Layout/ArticleLayout';
import { SEO } from 'components/SEO';
import { CustomLink, External } from 'components/CustomLink';
import { ChangeConsent } from 'components/Ads/ChangeConsent';

const components = {
	a: CustomLink,
	External,
	ChangeConsent,
};

interface Props {
	content: {
		compiledSource: string;
	};
	meta: {
		title: string;
		heading: string;
		description: string;
		image: string;
		date: string;
	};
	slug: string;
}

interface Schema {
	'@context': string;
	'@type': string;
	mainEntityOfPage: {
		'@type': string;
		'@id': string;
	};
	headline: string;
	description: string;
	author: {
		'@type': string;
		name: string;
	};
	publisher: {
		'@type': string;
		name: string;
		logo: {
			'@type': string;
			url: string;
		};
	};
	image?: {
		'@type'?: string;
		url?: string;
	};
	datePublished?: string;
}

export default function Page({ content, meta, slug }: Props) {
	// eslint-disable-next-line prefer-const
	let schema: Schema = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `https://stockanalysis/${slug}/`,
		},
		headline: meta.title,
		description: meta.description,
		author: { '@type': 'Person', name: 'Kris Gunnars, BSc' },
		publisher: {
			'@type': 'Organization',
			name: 'Stock Analysis',
			logo: {
				'@type': 'ImageObject',
				url: 'https://stockanalysis.com/logo.png',
			},
		},
	};

	if (meta.image) {
		schema.image = {
			'@type': 'ImageObject',
			url: `https://stockanalysis${meta.image}`,
		};
	}

	if (meta.date) {
		schema.datePublished = meta.date;
	}

	return (
		<>
			<SEO
				title={meta.title}
				description={meta.description}
				canonical={`${slug}/`}
				image={meta.image}
				schema={schema}
			/>
			<ArticleLayout meta={meta}>
				<div>
					<MDXRemote
						{...content}
						compiledSource={content.compiledSource}
						components={components}
					/>
				</div>
			</ArticleLayout>
		</>
	);
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const slug = params ? params.slug : '';
	const filePath = path.join(process.cwd(), 'content', `${slug}.mdx`);
	const source = fs.readFileSync(filePath);

	const { content, data } = matter(source);

	const mdxSource = await serialize(content, {
		scope: data,
	});

	return {
		props: {
			content: mdxSource,
			meta: data,
			slug: slug,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = [
		{ params: { slug: '5-ways-stock-buybacks-can-be-bad' } },
		{ params: { slug: 'about' } },
		{ params: { slug: 'analyst-ratings-explained' } },
		{ params: { slug: 'average-monthly-stock-returns' } },
		{ params: { slug: 'berkshire-class-a-and-class-b-stock' } },
		{ params: { slug: 'can-you-beat-the-market' } },
		{ params: { slug: 'data-disclaimer' } },
		{ params: { slug: 'etf-vs-mutual-fund' } },
		{ params: { slug: 'goog-vs-googl-stock' } },
		{ params: { slug: 'how-facebook-makes-money' } },
		{ params: { slug: 'how-often-are-dividends-paid' } },
		{ params: { slug: 'how-to-buy-stocks-online' } },
		{ params: { slug: 'how-to-short-stocks' } },
		{ params: { slug: 'negative-pe-ratio' } },
		{ params: { slug: 'peg-ratio' } },
		{ params: { slug: 'privacy-policy' } },
		{ params: { slug: 'recession-vs-depression' } },
		{ params: { slug: 'revenue-vs-income' } },
		{ params: { slug: 'safe-low-risk-investments' } },
		{ params: { slug: 'sitemap' } },
		{ params: { slug: 'stock-market-hours' } },
		{ params: { slug: 'stocks-in-bankruptcy' } },
		{ params: { slug: 'stocks-vs-bonds' } },
		{ params: { slug: 'terms-of-use' } },
		{ params: { slug: 'voo-vs-vti' } },
		{ params: { slug: 'warren-buffett-money' } },
		{ params: { slug: 'what-is-the-best-sp500-etf' } },
		{ params: { slug: 'where-to-park-cash' } },
		{ params: { slug: 'who-determines-recessions' } },
		{ params: { slug: 'why-stock-buybacks-are-good' } },
		{ params: { slug: 'youtube-stock' } },
	];

	return {
		paths,
		fallback: false,
	};
};
