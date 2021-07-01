import Meta from '@/components/Meta';
import { NewsletterWidget } from '@/components/Layout/Sidebar/Newsletter';
import Breadcrumbs from '@/components/Breadcrumbs/_Breadcrumbs';

export default function PageLayout({ meta, children }) {
	return (
		<>
			<Meta title={meta.title} />
			<div className="contain">
				<main className="w-full py-5 xs:py-6">
					<Breadcrumbs />
					<h1 className="hh1 border-b-[3px] border-blue-brand_sharp pb-3 mb-3">
						{meta.heading || meta.title}
					</h1>

					<div className="lg:grid lg:grid-cols-sidebar gap-x-10">
						<div className="py-2">{children}</div>
						<aside className="flex flex-col space-y-10 py-6">
							<NewsletterWidget />
						</aside>
					</div>
				</main>
			</div>
		</>
	);
}
