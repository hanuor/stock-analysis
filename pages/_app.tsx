import 'styles/globals.css';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Header } from 'components/Layout/Header/_Header';
import { Footer } from 'components/Layout/Footer/_Footer';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', (url) => {
	NProgress.start();
});

declare global {
	// eslint-disable-next-line no-unused-vars
	interface Window {
		dianomiReloadContext: any;
	}
}

Router.events.on('routeChangeComplete', () => {
	NProgress.done();
	// Reload Dianomi ads
	if (typeof window.dianomiReloadContext !== 'undefined') {
		window.dianomiReloadContext();
	}
});
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Header />
			<Component {...pageProps} />
			<Footer />
		</>
	);
}

// export function reportWebVitals(metric: any) {
// 	console.log(metric);
// }

export default MyApp;
