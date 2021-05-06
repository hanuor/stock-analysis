import Meta from "@/components/Meta";
import Header from "@/Layout/Header";
import Footer from "@/Layout/Footer";

function LayoutFullWidth(props) {
	return (
		<>
			<Meta title={props.title}></Meta>
			<div className="h-screen flex flex-col">
				<Header />
				<main>{props.children}</main>
				<Footer />
			</div>
		</>
	);
}

export default LayoutFullWidth;