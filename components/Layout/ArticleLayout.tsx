import { ReactNode } from 'react';
import { Sidebar1 } from 'components/Ads/Snigel/Sidebar1';
import { Sidebar2 } from 'components/Ads/Snigel/Sidebar2';
import { Features } from './Sidebar/Features';
import { Byline } from './Article/Byline';

interface Meta {
	title: string;
	heading?: string;
	description?: string;
	image?: string;
	date?: string;
}

interface Props {
	meta: Meta;
	children: ReactNode;
}

/**
 * The content/sidebar layout for articles and financial terms
 * @param {Meta} meta - The meta data for the page
 * @param {ReactNode} children - The content to be displayed
 * @return Component
 */

export const ArticleLayout = ({ meta, children }: Props) => {
	return (
		<>
			<div className="mx-auto lg:max-w-[1150px] pt-7 md:pt-10 px-4 lg:px-6 lg:grid lg:grid-cols-sidebar lg:gap-12">
				<main id="main">
					<article className="text-page md:px-6">
						<header className="article-header">
							<h1>{meta.heading || meta.title}</h1>
							{meta.date && <Byline date={meta.date} />}
						</header>
						{children}
					</article>
				</main>
				<aside className="space-y-8 lg:pt-4">
					<Sidebar1 />
					<Features />
					<Sidebar2 />
				</aside>
			</div>
		</>
	);
};
