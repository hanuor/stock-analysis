import { External } from '@/components/CustomLink';

const ProfileSECfilings = ({ filings, cik }) => {
	return (
		<>
			<h2 className="hh2 mt-6 xs:mt-8">Latest SEC Filings</h2>
			<table className="w-full">
				<thead>
					<tr className="border-b border-t border-gray-200 bg-gray-50">
						<th
							scope="col"
							className="text-left py-2 px-1 xs:px-2 text-gray-800">
							Date
						</th>
						<th
							scope="col"
							className="text-left py-2 px-1 xs:px-2 text-gray-800">
							Type
						</th>
						<th
							scope="col"
							className="text-left py-2 px-1 xs:px-2 text-gray-800">
							Title
						</th>
					</tr>
				</thead>
				<tbody>
					{filings.map((item, index) => (
						<tr key={index} className="border-b border-gray-200">
							<td className="py-3 pr-1 xs:px-2 text-gray-900 align-top">
								<span title={item.time}>{item.cleantime}</span>
							</td>
							<td className="py-3 px-1 xs:px-2 text-gray-900 align-top">
								{item.type}
							</td>
							<td className="py-3 pl-1 xs:px-2 align-top">
								<External url={item.url} text={item.title} />
							</td>
						</tr>
					))}
					<tr className="border-b border-gray-200">
						<td colSpan="3" className="py-3 px-4 text-xl font-medium">
							<External
								url={`https://www.sec.gov/cgi-bin/browse-edgar?CIK=${cik}&count=100';`}
								text="View All SEC Filings"
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};

export default ProfileSECfilings;
