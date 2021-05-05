import LayoutSidebar from "@/Layout/LayoutSidebar";
import Table from "@/components/Table";

export default function StocksIndexPage({ stocks }) {

	return (
		<LayoutSidebar title="All Stocks">
			{/* <ul>
				{Object.keys(stocks).map((key, index) => {
					return <li key={index}>{`${key} - ${stocks[key]['n']}`}</li>
				})}
			</ul> */}

			<Table>

				{Object.keys(stocks).map((key, index) => {
					return (
						<tr className="shadow-sm" key={index}>
							<td>{key}</td>
							<td>{stocks[key]['n']}</td>
						</tr>);
				})}

			</Table>
		</LayoutSidebar>
	)
}


export async function getStaticProps() {
	const stocksList = await fetch(process.env.API_URL + "index?type=stocks");
	const json = await stocksList.json();

	return {
		props: {
			stocks: json
		}
	}
}