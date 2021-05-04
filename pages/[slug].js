import Page from "@/components/Page";

function Article(props) {
	return (
		<Page title={props.single.title.rendered}>
			<div dangerouslySetInnerHTML={{ __html: props.single.content.rendered }} />
		</Page>
	)
}

export async function getStaticPaths() {
	const res = await fetch("https://stockanalysis.com/wp-json/wp/v2/posts?per_page=100")
	const posts = await res.json();

	// console.log(posts);

	const paths = posts.map((post) => ({
		params: { slug: post.slug.toString() }
	}));

	return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
	const res = await fetch(`https://stockanalysis.com/wp-json/wp/v2/posts?slug=${params.slug}`);
	const post = await res.json();
	const single = post[0];

	console.log(single);

	return {
		props: { single }
	}
}

export default Article;