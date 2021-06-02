import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import matter from 'gray-matter';
import { allTermPaths, TERM_PATHS } from '@/Functions/markdown.functions.js';
import PageLayout from '@/components/Layout/PageLayout';
import Image from 'next/image';

const components = { Image };

export default function Page({ content, meta }) {
	return (
		<PageLayout meta={meta}>
			<div>
				<MDXRemote {...content} components={components} />
			</div>
		</PageLayout>
	);
}

export async function getStaticProps({ params }) {
	const termFile = path.join(TERM_PATHS, `${params.slug}.mdx`);
	const source = fs.readFileSync(termFile);

	const { content, data } = matter(source);

	const mdxSource = await serialize(content, {
		scope: data,
	});

	return {
		props: {
			content: mdxSource,
			meta: data,
		},
	};
}

export async function getStaticPaths() {
	const paths = allTermPaths
		.map((path) => path.replace(/\.mdx?$/, ''))
		.map((slug) => ({ params: { slug } }));

	return {
		paths,
		fallback: false,
	};
}
