import { External } from '@/components/CustomLink';
import { useState, useEffect } from 'react';
import axios from 'axios';

const formatSecDate = (string) => {
	let datetime = new Date(string);
	let timestamp = datetime.toLocaleString('en-US', {
		timeZone: 'America/New_York',
	});
	let date = datetime.toLocaleString('en-US', {
		timeZone: 'America/New_York',
		day: 'numeric',
		year: 'numeric',
		month: 'short',
	});

	return {
		timestamp,
		date,
	};
};

const ProfileSECfilings = ({ cik }) => {
	const [secFilings, setSecFilings] = useState([]);

	useEffect(() => {
		const source = axios.CancelToken.source();
		const getFilings = async () => {
			try {
				let request = await axios.get(`/api/sec/${cik}/`, {
					cancelToken: source.token,
					timeout: 5000,
				});
				setSecFilings(request.data);
			} catch (e) {
				console.log('There was a problem fetching SEC filings.');
			}
		};

		getFilings();

		return () => {
			source.cancel();
		};
	}, [cik]);

	if (!secFilings.length) {
		return null;
	} else {
		return (
			<>
				<h2 className="hh2 mt-6 xs:mt-8">Latest SEC Filings</h2>
				<table className="w-full mb-12">
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
						{secFilings.map((entry, index) => {
							let { timestamp, date } = formatSecDate(entry.updated);

							return (
								<tr key={index} className="border-b border-gray-200">
									<td className="py-3 pr-1 xs:px-2 text-gray-900 align-top">
										<span title={timestamp}>{date}</span>
									</td>
									<td className="py-3 px-1 xs:px-2 text-gray-900 align-top">
										{entry.content[0]['filing-type']}
									</td>
									<td className="py-3 pl-1 xs:px-2 align-top">
										<External
											url={entry.content[0]['filing-href']}
											text={entry.content[0]['form-name']}
										/>
									</td>
								</tr>
							);
						})}
						<tr className="border-b border-gray-200">
							<td colSpan="3" className="py-3 px-4 text-xl font-medium">
								<External
									url={`https://www.sec.gov/cgi-bin/browse-edgar?CIK=${cik}&count=100`}
									text="View All SEC Filings"
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</>
		);
	}
};

export default ProfileSECfilings;
