import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { allPostPaths, POST_PATHS } from '@/Functions/markdown.functions.js';
import LayoutArticle from '@/components/Layout/LayoutArticle';

export default function Page({ source }) {
	return (
		<LayoutArticle>
			<div>
				<MDXRemote {...source} />
			</div>
		</LayoutArticle>
	);
}

export async function getStaticProps({ params }) {
	const postFile = path.join(POST_PATHS, `${params.slug}.mdx`);
	const source = fs.readFileSync(postFile);

	const mdxSource = await serialize(source);

	return {
		props: {
			source: mdxSource,
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
