import type { AppProps } from 'next/app';
import Router from 'next/router';
import 'styles/globals.css';
import NProgress from 'nprogress';
import { Header } from 'components/Layout/Header/_Header';
import { Footer } from 'components/Layout/Footer/_Footer';

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // commentt

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', (url) => {
	NProgress.start();
});

Router.events.on('routeChangeComplete', () => NProgress.done());
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

export default MyApp;
