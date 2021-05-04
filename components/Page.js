import Layout from "@/components/Layout";

export default function Page({ children, title }) {
	return (
		<Layout type="sidebar">
			<article className="prose prose-lg max-w-none">
				<h1 className="text-3xl font-bold mb-4">{title}</h1>
				{children}
			</article>
		</Layout>
	);
}