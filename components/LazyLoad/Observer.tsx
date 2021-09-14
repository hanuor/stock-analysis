import useInView from 'react-cool-inview';

type Props = {
	children: React.ReactNode;
	offset: number;
};

export function Observer({ children, offset }: Props) {
	// Set the observer, disable when in view
	const { observe, unobserve, inView } = useInView({
		rootMargin: `${offset}px`,
		onEnter: () => {
			unobserve();
		},
	});

	// Return a div with an inView observer, only render when a) not pro user and b) view within threshold
	// The child component should be a wrapper component that loads the ad dynamically with ssr: false
	// Optionally, you can set width/height on the wrapper child component to set the size of the ad and reduce layout shift
	return <div ref={observe}>{inView && children}</div>;
}
