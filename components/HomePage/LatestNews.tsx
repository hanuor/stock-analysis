import Link from 'next/link';

type NewsMin = {
	t: string;
	u: string;
	n: string;
	d: string;
};

export const LatestNews = ({ news }: { news: NewsMin[] }) => (
	<section className="mx-auto px-3 xs:px-4 sm:px-5 lg:px-0 lg:col-span-2">
		<h2 className="text-2xl font-bold">Market News</h2>
		<table className="text-sm sm:text-base">
			<tbody>
				{news.map((item, index) => {
					return (
						<tr
							key={index}
							className="border-b border-gray-200 hover:bg-gray-50"
						>
							<td className="pr-1 pt-2 align-top text-gray-600">
								{item.d}
							</td>
							<td className="pl-2 py-2">
								<a
									href={item.u}
									target="_blank"
									rel="nofollow noopener noreferrer"
									className="bll"
								>
									{item.t}
								</a>
								<span className="text-gray-600"> - {item.n}</span>
							</td>
						</tr>
					);
				})}
				<tr className="border-b border-gray-200">
					<td
						colSpan={2}
						className="pl-0.5 bp:pl-1 sm:pl-2 pt-3 pb-2 text-base sm:text-lg font-semibold"
					>
						<span className="hidden xs:inline">More News:</span>
						<Link href="/news/">
							<a className="inline-flex items-center px-1.5 bp:px-2 py-1 ml-2 sm:ml-2 mb-1 rounded-md text-sm sm:text-base font-medium bg-gray-100 hover:bg-gray-200 bll">
								Markets
							</a>
						</Link>
						<Link href="/news/all-stocks/">
							<a className="inline-flex items-center px-1.5 bp:px-2 py-1 ml-2 sm:ml-3 mb-1 rounded-md text-sm sm:text-base font-medium bg-gray-100 hover:bg-gray-200 bll">
								All Stocks
							</a>
						</Link>
						<Link href="/ipos/news/">
							<a className="inline-flex items-center px-1.5 bp:px-2 py-1 ml-2 sm:ml-3 mb-1 rounded-md text-sm sm:text-base font-medium bg-gray-100 hover:bg-gray-200 bll">
								IPO News
							</a>
						</Link>
					</td>
				</tr>
			</tbody>
		</table>
	</section>
);
