import Symbol from "@/components/Symbols/Symbol";

export default function SymbolStatistics(props) {

	if (!props.data) { return <h1>Loading...</h1>; }

	return (
		<Symbol props={props}>
			<h2 className="text-xl">This is the statistics page for {props.ticker}</h2>
		</Symbol>
	);
}


export async function getStaticPaths() {

	const paths = [
		{ params: { symbol: 'aapl' } }
	];

	return {
		paths,
		fallback: true
	}
}


export async function getStaticProps({ params }) {

	const fetched = await fetch(process.env.API_URL + `/symbol?type=stock&symbol=${params.symbol}`);

	const data = await fetched.json();
	const ticker = params.symbol.toUpperCase();

	return {
		props: {
			data: data,
			ticker: ticker
		}
	}
}