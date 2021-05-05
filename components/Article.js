import Layout from "@/components/Page";

export default function Article({ children, title }) {
	return (
		<Page>
			<article className="container prose prose-lg max-w-screen-md py-10">
				<h1 className="text-3xl font-bold mb-4">{title}</h1>
				{children}
			</article>
		</Page>
	);
}