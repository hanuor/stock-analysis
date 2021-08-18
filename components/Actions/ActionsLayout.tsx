import { ReactNode } from 'react';
import { ActionsNavigation } from 'components/Actions/ActionsNavigation';
import { ActionsNavigationSub } from 'components/Actions/ActionsNavigationSub';
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs';
import { NewsletterWidget } from 'components/Layout/Sidebar/Newsletter';
import { Sidebar1 } from 'components/Ads/GPT/Sidebar1';

interface Props {
	title: string;
	children: ReactNode;
}

export const ActionsLayout = ({ title, children }: Props) => {
	return (
		<>
			<div className="contain">
				<main className="w-full py-5 xs:py-6">
					<Breadcrumbs />
					<h1 className="hh1">{title}</h1>
					<ActionsNavigation />

					<div className="lg:grid lg:grid-cols-sidebar gap-x-10">
						<div className="py-1.5">
							<ActionsNavigationSub />
							{children}
						</div>
						<aside className="flex flex-col space-y-10 py-6">
							<NewsletterWidget />
							<Sidebar1 />
						</aside>
					</div>
				</main>
			</div>
		</>
	);
};
