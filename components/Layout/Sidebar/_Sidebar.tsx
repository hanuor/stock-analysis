import { NewsletterWidget } from './Newsletter';
import { Sidebar1 } from 'components/Ads/Snigel/Sidebar1';

export const Sidebar = () => {
	return (
		<aside className="space-y-8 pt-4">
			<NewsletterWidget />
			<Sidebar1 />
		</aside>
	);
};
