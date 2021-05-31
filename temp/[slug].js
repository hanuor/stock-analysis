import LayoutArticle from "@/Layout/LayoutArticle";

function OutputArticle(props) {
	return (
		<LayoutArticle title={props.single.title.rendered}>
			<div dangerouslySetInnerHTML={{ __html: props.single.content.rendered }} />
		</LayoutArticle>
	)
}

export async function getStaticPaths() {
	const res = await fetch(process.env.API_URL_POSTS + "/posts?per_page=100");
	const posts = await res.json();

	const paths = posts.map((post) => ({
		params: { slug: post.slug.toString() }
	}));

	return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
	const res = await fetch(process.env.API_URL_POSTS + `/posts?slug=${params.slug}`);
	const post = await res.json();
	const single = post[0];

	return {
		props: { single }
	}
}

export default OutputArticle;