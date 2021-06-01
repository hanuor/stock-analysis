import Meta from '@/components/Meta';
import Header from '@/Layout/Header';
import Footer from '@/Layout/Footer';
import Sidebar from './Sidebar/_Sidebar';

export default function PageLayout({ meta, children }) {
	return (
		<>
			<Meta title={meta.title}></Meta>
			<Header />
			<div className="mx-auto lg:max-w-[1150px] py-6 lg:py-8 px-4 lg:px-6 lg:grid lg:grid-cols-sidebar lg:gap-12">
				<main>
					<article className="text-page lg:px-6">
						<h1>{meta.heading || meta.title}</h1>
						{children}
					</article>
				</main>
				<Sidebar />
			</div>
			<Footer />
		</>
	);
}
