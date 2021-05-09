import Meta from "@/components/Meta";
import Header from "@/Layout/Header";
import Footer from "@/Layout/Footer";
import SymbolHeading from "@/components/Symbols/Head";

export default function Symbol({ props, children }) {
	return (
		<>
			<Meta title={props.symbol.toUpperCase()}></Meta>
			<Header />
			<div className="container max-w-screen-xl py-8">
				<main>
					<SymbolHeading
						ticker={props.symbol}
						name={props.data.name_full}
						quote={props.data.quote}
					/>
					{children}
				</main>
			</div>
			<Footer />
		</>
	);
}
