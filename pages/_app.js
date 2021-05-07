import { GlobalContextProvider } from "@/components/GlobalContext";
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
	return (
		<GlobalContextProvider>
			<Component {...pageProps} />
		</GlobalContextProvider>
	)
}

export default MyApp
