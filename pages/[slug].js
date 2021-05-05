import Page from "@/components/Article";

function OutputArticle(props) {
	return (
		<Page title={props.single.title.rendered}>
			<div dangerouslySetInnerHTML={{ __html: props.single.content.rendered }} />
		</Page>
	)
}

export async function getStaticPaths() {
	const res = await fetch(process.env.API_URL_POSTS + "/posts?per_page=100");
	const posts = await res.json();

	console.log(posts);

	const paths = posts.map((post) => ({
		params: { slug: post.slug.toString() }
	}));

	return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
	const res = await fetch(process.env.API_URL_POSTS + `/posts?slug=${params.slug}`);
	const post = await res.json();
	const single = post[0];

	console.log(single);

	return {
		props: { single }
	}
}

export default OutputArticle;