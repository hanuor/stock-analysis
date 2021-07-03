import Image from 'next/image';

const ProfileInfo = ({ info, logo }) => {
	return (
		<div className="bg-gray-50 mt-7 lg:mt-1 px-3 xs:px-4 pt-3 xs:pt-4 pb-2 border border-gray-200 rounded">
			<table className="w-full">
				<tbody>
					<tr>
						<td
							colSpan="2"
							className="text-2xl font-semibold text-center pb-3"
						>
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
					{info.country && (
						<tr className="border-b border-gray-200">
							<td className="py-1.5 lg:py-2 px-1 font-semibold">
								Country
							</td>
							<td className="text-right py-1.5 lg:py-2 px-1">
								{info.country}
							</td>
						</tr>
					)}
					{info.founded && (
						<tr className="border-b border-gray-200">
							<td className="py-1.5 lg:py-2 px-1 font-semibold">
								Founded
							</td>
							<td className="text-right py-1.5 lg:py-2 px-1">
								{info.founded}
							</td>
						</tr>
					)}
					{info.ipoDate && (
						<tr className="border-b border-gray-200">
							<td className="py-1.5 lg:py-2 px-1 font-semibold">
								IPO Date
							</td>
							<td className="text-right py-1.5 lg:py-2 px-1">
								{info.ipoDate}
							</td>
						</tr>
					)}
					{info.industry && (
						<tr className="border-b border-gray-200">
							<td className="py-1.5 lg:py-2 px-1 font-semibold">
								Industry
							</td>
							<td className="text-right py-1.5 lg:py-2 px-1">
								{info.industry}
							</td>
						</tr>
					)}
					{info.sector && (
						<tr className="border-b border-gray-200">
							<td className="py-1.5 lg:py-2 px-1 font-semibold">
								Sector
							</td>
							<td className="text-right py-1.5 lg:py-2 px-1">
								{info.sector}
							</td>
						</tr>
					)}
					{info.employees && (
						<tr className="border-b border-gray-200">
							<td className="py-1.5 lg:py-2 px-1 font-semibold">
								Employees
							</td>
							<td className="text-right py-1.5 lg:py-2 px-1">
								{info.employees}
							</td>
						</tr>
					)}
					{info.ceo && (
						<tr className="">
							<td className="py-1.5 lg:py-2 px-1 font-semibold">CEO</td>
							<td className="text-right py-1.5 lg:py-2 px-1">
								{info.ceo}
							</td>
						</tr>
					)}
				</tbody>
				<style jsx>
					{`
						table tr:last-child {
							border-bottom: 0;
						}
					`}
				</style>
			</table>
		</div>
	);
};

export default ProfileInfo;
