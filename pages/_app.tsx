import type { AppProps } from 'next/app';
import 'styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
/* import { ReactQueryDevtools } from 'react-query/devtools' */
import Header from 'components/Layout/Header/_Header';
import Footer from 'components/Layout/Footer/_Footer';
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Header />
			<Component {...pageProps} />
			<Footer />
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
		</QueryClientProvider>
	);
}

export default MyApp;
