import { External } from '@/components/CustomLink';

const Address = (address) => {
	return { __html: address };
};

const ProfileContact = ({ contact }) => {
	return (
		<>
			<h2 className="hh2 mt-6 xs:mt-8">Contact Details</h2>
			<div className="bg-gray-50 px-4 pt-4 pb-2 border border-gray-200 rounded">
				<table className="w-full">
					<tbody>
						{contact.address && (
							<tr>
								<td colSpan="2" className="pb-3">
									<div className="text-lg font-bold mb-2">
										Address:
									</div>
									<div
										dangerouslySetInnerHTML={Address(contact.address)}
									/>
								</td>
							</tr>
						)}
						{contact.phone && (
							<tr className="border-t border-gray-200">
								<td className="py-2 px-0.5 font-semibold">Phone</td>
								<td className="py-2 px-0.5 text-right">
									{contact.phone}
								</td>
							</tr>
						)}
						{contact.website && (
							<tr className="border-t border-gray-200">
								<td className="py-2 px-0.5 font-semibold">Website</td>
								<td className="py-2 px-0.5 text-right">
									<External
										url={contact.website}
										text={contact.domain}
									/>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
};
export default ProfileContact;
