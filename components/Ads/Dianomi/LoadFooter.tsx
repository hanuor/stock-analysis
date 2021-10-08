import dynamic from 'next/dynamic';
const FooterAd = dynamic(() => import('components/Ads/Dianomi/FooterAd'), {
	ssr: false,
});
import { navState } from 'state/navState';

export function LoadFooter() {
	const route = navState((state) => state.route);

	return <FooterAd key={route} />;
}
