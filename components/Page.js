import Head from "next/head";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default function Page(props) {

	function LayoutSwitch(props) {
		switch (props.type) {

			case "full-width":
				return <main>{props.children}</main>

			case "sidebar":
				return <div className="container max-w-screen-md py-8">
					<main>{props.children}</main>
					<aside className="bg-red-50">Sidebar</aside>
				</div>;

			case "article":
				return <div className="container max-w-screen-xl grid lg:grid-cols-sidebar py-10 gap-x-10">
					<main>
						<h1>{props.title}</h1>
						{props.children}
					</main>
					<aside className="bg-red-50">Sidebar</aside>
				</div>;

			default:
				return <div className="container max-w-screen-md py-8">
					<main>{props.children}</main>
				</div>;
		}
	}

	return (
		<>
			<Head>
				<title>{props.title}</title>
			</Head>

			<div className="h-screen flex flex-col">
				<Header />
				<LayoutSwitch>{props.children}</LayoutSwitch>
				<Footer />
			</div>
		</>
	);
}