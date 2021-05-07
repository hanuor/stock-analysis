import Link from "next/link";
import { useRouter } from "next/router";

export default function SymbolHeading(props) {
	const router = useRouter();
	const symbol = router.query.symbol;

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">{props.name} ({props.ticker})</h1>

			<div>Stock Price: {props.quote.price}</div>

			<nav className="mb-4">
				<ul className="flex flex-row space-x-3">
					<li><Link href={`/stocks/${symbol}/`}>Overview</Link></li>
					<li><Link href={`/stocks/${symbol}/financials/`}>Financials</Link></li>
					<li><Link href={`/stocks/${symbol}/statistics/`}>Statistics</Link></li>
					<li><Link href={`/stocks/${symbol}/company/`}>Profile</Link></li>
					<li><Link href={`/stocks/${symbol}/chart/`}>Chart</Link></li>
				</ul>
			</nav>
		</div>
	)
}