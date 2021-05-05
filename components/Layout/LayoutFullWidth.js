import Meta from "@/components/Meta";
import Header from "@/Layout/Header";
import Footer from "@/Layout/Footer";

function LayoutFullWidth(props) {
	return (
		<>
			<Meta title={props.title}></Meta>
			<Header />
			<div className="h-screen flex flex-col">
				<main>{props.children}</main>
			</div>
			<Footer />
		</>
	);
}

export default LayoutFullWidth;