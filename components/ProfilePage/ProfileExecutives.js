const ProfileExecutives = ({ executives }) => {
	return (
		<>
			<h2 className="hh2 mt-6 xs:mt-8 lg:mt-4">Key Executives</h2>
			<table className="w-full text-base mb-6 xs:mb-8">
				<thead className="bg-gray-50">
					<tr className="border-b border-t border-gray-200">
						<th
							scope="col"
							className="text-left py-2.5 xs:py-3 px-2 xs:px-3 sm:px-4 font-medium text-gray-800"
						>
							Name
						</th>
						<th
							scope="col"
							className="text-left py-2.5 xs:py-3 px-2 xs:px-3 sm:px-4 font-medium text-gray-800"
						>
							Position
						</th>
					</tr>
				</thead>
				<tbody>
					{executives.map((item, index) => (
						<tr key={index} className="border-b border-gray-200">
							<td className="py-2.5 xs:py-3 px-2 xs:px-3 sm:px-4 font-medium text-gray-900 align-top">
								{item.Name}
							</td>
							<td className="py-2.5 xs:py-3 px-2 xs:px-3 sm:px-4 text-gray-800 align-top">
								{item.Title}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default ProfileExecutives;
