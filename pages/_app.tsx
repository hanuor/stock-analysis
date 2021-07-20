import type { AppProps } from 'next/app';
import 'styles/globals.css';
import { Header } from 'components/Layout/Header/_Header';
import { Footer } from 'components/Layout/Footer/_Footer';
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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
