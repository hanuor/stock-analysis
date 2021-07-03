import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import matter from 'gray-matter';
import { allPostPaths, POST_PATHS } from 'functions/markdown.functions';
import ArticleLayout from 'components/Layout/ArticleLayout';
import Image from 'next/image';
import CustomLink, { External } from 'components/CustomLink';

const components = {
	a: CustomLink,
	Image,
	External,
};

export default function Page({ content, meta }) {
	return (
		<ArticleLayout meta={meta}>
			<div>
				<MDXRemote {...content} components={components} />
			</div>
		</ArticleLayout>
	);
}

export async function getStaticProps({ params }) {
	const postFile = path.join(POST_PATHS, `${params.slug}.mdx`);
	const source = fs.readFileSync(postFile);

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
	const paths = allPostPaths
		.map((path) => path.replace(/\.mdx?$/, ''))
		.map((slug) => ({ params: { slug } }));

	return {
		paths,
		fallback: false,
	};
}
