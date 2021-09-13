import { authState } from 'state/authState';
import { navState } from 'state/navState';
import useInView from 'react-cool-inview';
import { noAds } from 'components/Ads/noAds';

type Props = {
	children: React.ReactNode;
};

export function LazyLoadAd({ children }: Props) {
	// Fetch the auth state
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);

	// Check the nav state
	const path = navState((state) => state.path);

	// Set the observer
	const { observe, unobserve, inView } = useInView({
		rootMargin: '500px',
		onEnter: () => {
			unobserve();
		},
	});

	// Return a div with an inView observer, only render when a) not pro user  and b) view within threshold
	// The child component should be a wrapper component that loads the ad dynamically with ssr: false
	// Optionally, you can set width/height on the wrapper child component to set the size of the ad and reduce layout shift
	return (
		<>
			{status === 'completed' && !isPro && !noAds(path.one) && (
				<div ref={observe}>{inView && children}</div>
			)}
		</>
	);
}
