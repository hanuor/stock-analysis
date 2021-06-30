import '../styles/globals.css';
import Header from '@/Layout/Header/_Header';
import Footer from '@/Layout/Footer/_Footer';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Header />
			<Component {...pageProps} />
			<Footer />
		</>
	);
}

export default MyApp;
