import Link from "next/link";
import { useRouter } from "next/router";

export default function SymbolHeading(props) {
	const router = useRouter();
	const symbol = router.query.symbol;

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">{props.name} ({props.ticker.toUpperCase()})</h1>

			<div>Stock Price: {props.quote.price}</div>

			<nav className="mb-4">
				<ul className="flex flex-row space-x-3">
					<li><Link href={`/stocks/${symbol}/`}><a>Overview</a></Link></li>
					<li><Link href={`/stocks/${symbol}/financials/`}><a>Financials</a></Link></li>
					<li><Link href={`/stocks/${symbol}/statistics/`}><a>Statistics</a></Link></li>
					<li><Link href={`/stocks/${symbol}/company/`}><a>Profile</a></Link></li>
					<li><Link href={`/stocks/${symbol}/chart/`}><a>Chart</a></Link></li>
				</ul>
			</nav>
		</div>
	)
}