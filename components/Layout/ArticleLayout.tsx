import { ReactNode } from 'react';
import { Sidebar } from './Sidebar/_Sidebar';
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

export const ArticleLayout = ({ meta, children }: Props) => {
	return (
		<>
			<div className="mx-auto lg:max-w-[1150px] py-6 lg:py-8 px-4 lg:px-6 lg:grid lg:grid-cols-sidebar lg:gap-12">
				<main>
					<article className="text-page lg:px-6">
						<header className="article-header">
							<h1>{meta.heading || meta.title}</h1>
							{meta.date && <Byline date={meta.date} />}
						</header>
						{children}
					</article>
				</main>
				<Sidebar />
			</div>
		</>
	);
};
