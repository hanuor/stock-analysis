/* eslint-disable @next/next/no-img-element */
import { CompanyInfo, Logo } from 'types/Company';

interface Props {
	info: CompanyInfo;
	logo: Logo;
}

export const ProfileInfo = ({ info, logo }: Props) => {
	return (
		<div className="bg-gray-50 mt-7 lg:mt-1 px-3 xs:px-4 pt-3 xs:pt-4 pb-2 border border-gray-200 rounded">
			<div className="text-2xl font-semibold text-center pb-3">
				{info.name}
			</div>
			{logo.src && (
				<div className="mb-2">
					<img
						src={logo.src}
						width={logo.width}
						height={logo.height}
						alt={logo.alt}
						className="mx-auto py-1"
					/>
				</div>
			)}
			<table className="w-full profile-table">
				<tbody>
					{info.country && (
						<tr>
							<td className="py-1.5 lg:py-2 px-1 font-semibold">
								Country
							</td>
							<td className="text-right py-1.5 lg:py-2 px-1">
								{info.country}
							</td>
						</tr>
					)}
					{info.founded && (
						<tr>
							<td className="py-1.5 lg:py-2 px-1 font-semibold">
								Founded
							</td>
							<td className="text-right py-1.5 lg:py-2 px-1">
								{info.founded}
							</td>
						</tr>
					)}
					{info.ipoDate && (
						<tr>
							<td className="py-1.5 lg:py-2 px-1 font-semibold">
								IPO Date
							</td>
							<td className="text-right py-1.5 lg:py-2 px-1">
								{info.ipoDate}
							</td>
						</tr>
					)}
					{info.industry && (
						<tr>
							<td className="py-1.5 lg:py-2 px-1 font-semibold">
								Industry
							</td>
							<td className="text-right py-1.5 lg:py-2 px-1">
								{info.industry}
							</td>
						</tr>
					)}
					{info.sector && (
						<tr>
							<td className="py-1.5 lg:py-2 px-1 font-semibold">
								Sector
							</td>
							<td className="text-right py-1.5 lg:py-2 px-1">
								{info.sector}
							</td>
						</tr>
					)}
					{info.employees && (
						<tr>
							<td className="py-1.5 lg:py-2 px-1 font-semibold">
								Employees
							</td>
							<td className="text-right py-1.5 lg:py-2 px-1">
								{info.employees}
							</td>
						</tr>
					)}
					{info.ceo && (
						<tr>
							<td className="py-1.5 lg:py-2 px-1 font-semibold">CEO</td>
							<td className="text-right py-1.5 lg:py-2 px-1">
								{info.ceo}
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};
