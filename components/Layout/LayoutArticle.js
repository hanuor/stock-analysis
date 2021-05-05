import Meta from "@/components/Meta";
import Header from "@/Layout/Header";
import Footer from "@/Layout/Footer";

function LayoutFullWidth(props) {
	return (
		<>
			<Meta title={props.title}></Meta>
			<Header />
			<div className="container max-w-screen-xl grid lg:grid-cols-sidebar py-10 gap-x-10">
				<main>
					<article className="prose prose-lg max-w-none px-12">
						<h1>{props.title}</h1>
						{props.children}
					</article>
				</main>
				<aside className="bg-red-100">Sidebar</aside>
			</div>
			<Footer />
		</>
	);
}

export default LayoutFullWidth;