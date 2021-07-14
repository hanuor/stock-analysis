import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import matter from 'gray-matter';
import { allTermPaths, TERM_PATHS } from 'functions/markdown.functions';
import ArticleLayout from 'components/Layout/ArticleLayout';
import { SEO } from 'components/SEO';
import Image from 'next/image';
import { CustomLink } from 'components/CustomLink';

const components = {
	a: CustomLink,
	Image,
};

export default function Page({ content, meta, slug }) {
	return (
		<>
			<SEO
				title={meta.title}
				description={meta.description}
				canonical={`term/${slug}/`}
				image={meta.image}
			/>
			<ArticleLayout heading={meta.heading || meta.title}>
				<div>
					<MDXRemote {...content} components={components} />
				</div>
			</ArticleLayout>
		</>
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
			slug: params.slug,
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
