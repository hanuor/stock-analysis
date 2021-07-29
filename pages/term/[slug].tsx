import { GetStaticProps, GetStaticPaths } from 'next';
import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import matter from 'gray-matter';
import { allTermPaths, TERM_PATHS } from 'functions/markdown.functions';
import { ArticleLayout } from 'components/Layout/ArticleLayout';
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

export default function Page({ content, meta, slug }: Props) {
	return (
		<>
			<SEO
				title={meta.title}
				description={meta.description}
				canonical={`term/${slug}/`}
				image={meta.image}
			/>
			<ArticleLayout meta={meta}>
				<div>
					<MDXRemote {...content} components={components} />
				</div>
			</ArticleLayout>
		</>
	);
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const slug = params ? params.slug : '';
	const termFile = path.join(TERM_PATHS, `${slug}.mdx`);
	const source = fs.readFileSync(termFile);

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
	const paths = allTermPaths
		.map((path) => path.replace(/\.mdx?$/, ''))
		.map((slug) => ({ params: { slug } }));

	return {
		paths,
		fallback: false,
	};
};
