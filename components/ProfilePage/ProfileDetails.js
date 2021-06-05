const map = [
	{
		title: 'Ticker Symbol',
		id: 'symbol',
	},
	{
		title: 'Exchange',
		id: 'exchange',
	},
	{
		title: 'Fiscal Year',
		id: 'fiscalYear',
	},
	{
		title: 'Reporting Currency',
		id: 'currency',
	},
	{
		title: 'IPO Price',
		id: 'ipoPrice',
	},
	{
		title: 'CIK Code',
		id: 'cik',
	},
	{
		title: 'CUSIP Number',
		id: 'cusip',
	},
	{
		title: 'ISIN Number',
		id: 'isin',
	},
	{
		title: 'Employer ID',
		id: 'eid',
	},
];

const SingleRow = ({ title, string }) => {
	if (string) {
		return (
			<tr>
				<td className="py-2 px-2 font-semibold">{title}</td>
				<td className="py-2 px-2 text-right">{string}</td>
			</tr>
		);
	}
	return null;
};

const ProfileDetails = ({ details }) => {
	return (
		<div className="bg-gray-50 px-4 pt-4 pb-2 border border-gray-200">
			<table className="w-full detailstable">
				<tbody>
					{map.map((item, index) => (
						<SingleRow
							title={item.title}
							string={details[item.id]}
							key={index}
						/>
					))}
				</tbody>
			</table>
			<style global jsx>{`
				table.detailstable tr:not(:last-child) {
					border-bottom: 1px solid #ddd;
				}
			`}</style>
		</div>
	);
};

export default ProfileDetails;
