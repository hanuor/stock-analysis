import { GetStaticProps, GetStaticPaths } from 'next';
import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import matter from 'gray-matter';
import { allPostPaths, POST_PATHS } from 'functions/markdown.functions';
import ArticleLayout from 'components/Layout/ArticleLayout';
import { SEO } from 'components/SEO';
import Image from 'next/image';
import { CustomLink, External } from 'components/CustomLink';

const components = {
	a: CustomLink,
	Image,
	External,
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
			<ArticleLayout heading={meta.heading || meta.title}>
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
	const postFile = path.join(POST_PATHS, `${slug}.mdx`);
	const source = fs.readFileSync(postFile);

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
	const paths = allPostPaths
		.map((path) => path.replace(/\.mdx?$/, ''))
		.map((slug) => ({ params: { slug } }));

	return {
		paths,
		fallback: false,
	};
};
