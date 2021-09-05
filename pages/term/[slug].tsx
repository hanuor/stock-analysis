import { GetStaticProps, GetStaticPaths } from 'next';
import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import matter from 'gray-matter';
import { ArticleLayout } from 'components/Layout/ArticleLayout';
import { SEO } from 'components/SEO';
import { CustomLink, External } from 'components/CustomLink';

const components = {
	a: CustomLink,
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
				canonical={`/term/${slug}/`}
				image={meta.image}
				type="article"
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
	const filePath = path.join(process.cwd(), 'content/term', `${slug}.mdx`);
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
		{ params: { slug: 'balance-sheet' } },
		{ params: { slug: 'cash-flow-statement' } },
		{ params: { slug: 'dividend' } },
		{ params: { slug: 'enterprise-value' } },
		{ params: { slug: 'eps-earnings-per-share' } },
		{ params: { slug: 'free-cash-flow' } },
		{ params: { slug: 'gross-profit' } },
		{ params: { slug: 'income-statement' } },
		{ params: { slug: 'market-capitalization' } },
		{ params: { slug: 'market-to-book-ratio' } },
		{ params: { slug: 'net-income' } },
		{ params: { slug: 'operating-income' } },
		{ params: { slug: 'pe-ratio' } },
		{ params: { slug: 'revenue' } },
		{ params: { slug: 'roe-return-on-equity' } },
		{ params: { slug: 'ttm-trailing-twelve-months' } },
		{ params: { slug: 'yoy-year-over-year' } },
	];

	return {
		paths,
		fallback: false,
	};
};
