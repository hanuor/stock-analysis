const NewsletterWidget = () => {
	return (
		<div className="border border-gray-300 bg-gray-100 p-5 text-center">
			<h4 className="text-2xl font-bold mb-4">
				The Stock Analysis Newsletter
			</h4>
			<p className="text-xl mb-4">Get the latest updates in your inbox.</p>
			<input
				type="text"
				placeholder="Enter your email..."
				className="w-full shadow-sm py-2 px-4 text-lg mb-3"
			/>
			<button
				type="submit"
				className="w-full bg-blue-500 text-white py-2 mb-2 text-lg font-semibold">
				Subscribe
			</button>
			<small>Read the privacy policy.</small>
		</div>
	);
};

export default function Sidebar() {
	return (
		<aside>
			<NewsletterWidget />
		</aside>
	);
}
