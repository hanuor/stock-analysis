import PageContext from "@/components/Context/PageContext";
import StockContext from "@/components/Context/StockContext";
import Link from "next/link";
import { useContext } from "react";

export default function Profile() {
	const info = useContext(StockContext);
	const data = useContext(PageContext);

	return (
		<div>
			<h2 className="text-2xl font-bold mb-3">About {info.ticker}</h2>
			<p>
				{data.description}{" "}
				<Link href={`/stocks/${info.symbol}/company/`}>
					<a className="text-blue-500 hover:text-black">[Read more...]</a>
				</Link>
			</p>

			<div className="mt-2 grid grid-cols-2">
				{Object.keys(data.infoTable).map(function (number, index) {
					return (
						<div className="my-[0.4rem]" key={index}>
							<span className="font-bold block">
								{data.infoTable[number][0]}
							</span>
							<span>{data.infoTable[number][1]}</span>
						</div>
					);
				})}
			</div>

			<button className="w-full bg-blue-500 my-3 py-2 px-3 text-xl text-white font-semibold">
				<Link href={`/stocks/${info.symbol}/company/`}>
					<a>Full Company Profile</a>
				</Link>
			</button>
		</div>
	);
}
