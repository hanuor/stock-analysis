import { NewsletterWidget } from './Newsletter';

const Ad = () => {
	return null;
	/* return (
		<div className="py-10 sticky top-20">
			<script
				type="text/javascript"
				id="dianomi_context_script"
				src="https://www.dianomi.com/js/contextfeed.js"></script>
			<div className="dianomi_context" data-dianomi-context-id="420"></div>
		</div>
	); */
};

export default function Sidebar() {
	return (
		<aside className="pt-4">
			<NewsletterWidget />
			<Ad />
		</aside>
	);
}
