import dynamic from 'next/dynamic';
const FooterDianomi = dynamic(() => import('components/Ads/Dianomi/FootHorz'), {
	ssr: false,
});
import { navState } from 'state/navState';

export function LoadFooter() {
	const route = navState((state) => state.route);

	return <FooterDianomi key={route} />;
}
