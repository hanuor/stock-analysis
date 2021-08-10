import { ReactNode } from 'react';
import { NewsletterWidget } from 'components/Layout/Sidebar/Newsletter';
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs';
import { Sidebar1 } from 'components/Ads/GPT/Sidebar1';

interface Props {
	heading: string;
	children: ReactNode;
}

export const LayoutSidebar = ({ heading, children }: Props) => {
	return (
		<div className="contain">
			<main id="main" className="w-full py-5 xs:py-6">
				<Breadcrumbs />
				<h1 className="hh1 border-b-[3px] border-blue-brand_sharp pb-3 mb-3">
					{heading}
				</h1>

				<div className="lg:grid lg:grid-cols-sidebar gap-x-10">
					<div className="py-2">{children}</div>
					<aside className="flex flex-col space-y-10 py-6">
						<NewsletterWidget />
						<Sidebar1 />
					</aside>
				</div>
			</main>
		</div>
	);
};
