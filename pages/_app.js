import ContextWrapper from "@/components/Context/ContextWrapper";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
	return (
		<ContextWrapper>
			<Component {...pageProps} />
		</ContextWrapper>
	);
}

export default MyApp;
