import Image from 'next/image';

const ProfileInfo = ({ info, logo }) => {
	return (
		<div className="bg-gray-50 px-4 pt-4 pb-2 border border-gray-200">
			<table className="w-full">
				<tbody>
					<tr>
						<td
							colSpan="2"
							className="text-2xl font-semibold text-center pb-3">
							{info.name}
						</td>
					</tr>
					{logo.src && (
						<tr>
							<td colSpan="2" className="text-center">
								<Image
									src={logo.src}
									width={logo.width}
									height={logo.height}
									alt={logo.alt}
								/>
							</td>
						</tr>
					)}
					<tr className="border-b border-gray-200">
						<td className="py-1.5 px-1 font-semibold">Country</td>
						<td className="text-right py-1.5 px-1">{info.country}</td>
					</tr>
					<tr className="border-b border-gray-200">
						<td className="py-1.5 px-1 font-semibold">Founded</td>
						<td className="text-right py-1.5 px-1">{info.founded}</td>
					</tr>
					<tr className="border-b border-gray-200">
						<td className="py-1.5 px-1 font-semibold">IPO Date</td>
						<td className="text-right py-1.5 px-1">{info.ipoDate}</td>
					</tr>
					<tr className="border-b border-gray-200">
						<td className="py-1.5 px-1 font-semibold">Industry</td>
						<td className="text-right py-1.5 px-1">{info.industry}</td>
					</tr>
					<tr className="border-b border-gray-200">
						<td className="py-1.5 px-1 font-semibold">Sector</td>
						<td className="text-right py-1.5 px-1">{info.sector}</td>
					</tr>
					<tr className="border-b border-gray-200">
						<td className="py-1.5 px-1 font-semibold">Employees</td>
						<td className="text-right py-1.5 px-1">{info.employees}</td>
					</tr>
					<tr className="">
						<td className="py-1.5 px-1 font-semibold">CEO</td>
						<td className="text-right py-1.5 px-1">{info.ceo}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default ProfileInfo;
