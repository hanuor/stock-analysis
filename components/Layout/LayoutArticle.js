import Meta from '@/components/Meta';
import Header from '@/Layout/Header';
import Footer from '@/Layout/Footer';
import Sidebar from '@/components/Layout/Sidebar/_Sidebar';

export default function LayoutArticle({ meta, children }) {
	return (
		<>
			<Meta title={meta.title}></Meta>
			<Header />
			<div className="mx-auto px-3 lg:px-4 grid lg:grid-cols-sidebar py-10 gap-x-10 xl: max-w-screen-xl">
				<main>
					<article className="prose prose-lg max-w-none px-12">
						<h1>{meta.title}</h1>
						{children}
					</article>
				</main>
				<Sidebar />
			</div>
			<Footer />
		</>
	);
}
