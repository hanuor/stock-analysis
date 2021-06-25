import '../styles/globals.css';
import { AuthProvider } from 'firebase/AuthContext';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default MyApp;
