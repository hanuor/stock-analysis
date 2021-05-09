import LayoutSidebar from "@/Layout/LayoutSidebar";
import Link from "next/link";

export default function Blog({ posts }) {
	function BlogCard({ post }) {
		return (
			<div className="shadow-md my-6 px-2 py-4">
				<Link href={`/${post.slug}/`}>
					<h2 className="text-2xl font-bold cursor-pointer">
						{post.title.rendered}
					</h2>
				</Link>
			</div>
		);
	}

	return (
		<LayoutSidebar title="Blog">
			{posts.map((post) => (
				<BlogCard key={post.id} post={post} />
			))}
		</LayoutSidebar>
	);
}

export async function getStaticProps() {
	const response = await fetch(
		process.env.API_URL_POSTS + "/posts?per_page=100"
	);
	const posts = await response.json();

	return {
		props: { posts },
	};
}
