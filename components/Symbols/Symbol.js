import Meta from "@/components/Meta";
import Header from "@/Layout/Header";
import Footer from "@/Layout/Footer";
import SymbolHeading from "@/components/Symbols/SymbolHeading";


export default function Symbol({ props, children }) {

	return (
		<>
			<Meta title={props.ticker}></Meta>
			<Header />
			<div className="container max-w-screen-xl py-10">
				<main>
					<SymbolHeading ticker={props.ticker} name={props.data.name_full} quote={props.data.quote} />
					{children}
				</main>
			</div>
			<Footer />
		</>
	);
}
