import Meta from '@/components/Meta';
import Header from '@/Layout/Header';
import Footer from '@/Layout/Footer';
import Sidebar from './Sidebar/_Sidebar';

export default function PageLayout({ meta, children }) {
	return (
		<>
			<Meta title={meta.title}></Meta>
			<Header />
			<div className="mx-auto lg:max-w-[1100px] py-6 lg:py-8 px-4 lg:px-6 lg:grid lg:grid-cols-sidebar lg:gap-10">
				<main>
					<article className="text-page lg:px-4">
						<h1>{meta.heading}</h1>
						{children}
					</article>
				</main>
				<Sidebar />
			</div>
			<Footer />
		</>
	);
}
