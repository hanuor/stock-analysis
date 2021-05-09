import Meta from "@/components/Meta";
import Header from "@/Layout/Header";
import Footer from "@/Layout/Footer";
import Sidebar from "@/Layout/Sidebar";

function LayoutSidebar(props) {
	return (
		<>
			<Meta title={props.title}></Meta>
			<Header />
			<div className="container max-w-screen-xl grid lg:grid-cols-sidebar py-10 gap-x-10">
				<main>
					<h1 className="text-3xl font-bold mb-5">{props.title}</h1>
					{props.children}
				</main>
				<Sidebar />
			</div>
			<Footer />
		</>
	);
}

export default LayoutSidebar;
