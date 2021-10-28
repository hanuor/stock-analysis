import 'styles/globals.css';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Header } from 'components/Layout/Header/_Header';
import { Footer } from 'components/Layout/Footer/_Footer';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', (url) => {
	NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
	NProgress.done();
});
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Header />
			<Component {...pageProps} />
			<Footer />
		</QueryClientProvider>
	);
}

// export function reportWebVitals(metric: any) {
// 	console.log(metric);
// }

export default MyApp;
