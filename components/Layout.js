import Header from "@/components/Header";
import Footer from "@/components/Footer";

function LayoutSidebar({ children }) {
	return (
		<div className="container max-w-screen-xl grid lg:grid-cols-sidebar py-10 gap-x-10">
			<main className="">{children}</main>
			<aside className="bg-gray-100">Sidebar</aside>
		</div>
	)
}

function LayoutFullWidth({ children }) {
	return (<main>{children}</main>);
}

export default function Layout({ children, type }) {
	return (
		<div className="h-screen flex flex-col">
			<Header />

			{type === "sidebar"
				? <LayoutSidebar>{children}</LayoutSidebar>
				: <LayoutFullWidth>{children}</LayoutFullWidth>
			}
			<Footer />
		</div>
	);
}