import { SecFilings, Filing } from 'types/Company';
import { External } from 'components/CustomLink';
import { useState, useEffect } from 'react';
import Axios from 'axios';

interface Props {
	id: number;
	cik: string;
	filings: SecFilings | null;
}

export const ProfileSECfilings = ({ id, cik, filings }: Props) => {
	const [entries, setEntries] = useState<Filing[]>([]);
	const [updated, setUpdated] = useState<string>('');
	const [loaded, setLoaded] = useState(false);
	const [fetched, setFetched] = useState(false);

	useEffect(() => {
		if (filings) {
			setEntries(filings.filings);
			setUpdated(filings.updated);
			setLoaded(true);
		} else if (filings === null) {
			setUpdated('');
			setLoaded(true);
		}
	}, [filings]);

	useEffect(() => {
		const source = Axios.CancelToken.source();

		if (loaded && !fetched) {
			const fetchSec = async () => {
				const url = `${process.env.NEXT_PUBLIC_API_URL}/sec?cik=${cik}&c=10&i=${id}&json=1`;

				try {
					setFetched(true);
					const res = await Axios.get(url, {
						cancelToken: source.token,
						timeout: 5000,
					});
					const newSec = res.data;

					if (
						!entries.length ||
						(newSec && newSec.filings[0].time !== entries[0].time)
					) {
						setEntries(newSec.filings);
						setUpdated(newSec.updated);
					}
				} catch (err) {
					if (!Axios.isCancel(err)) {
						console.error(err);
					}
				}
			};

			const now = new Date().getTime();
			const timestamp = Date.parse(updated);
			const diff = (now - timestamp) / 1000;

			if (!entries.length || diff > 12 * 60 * 60 || isNaN(diff)) {
				fetchSec();
			}
		}

		return () => {
			source.cancel('Unmounted');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updated]);

	if (!entries || !entries.length) {
		return null;
	} else {
		return (
			<>
				<h2 className="hh2">Latest SEC Filings</h2>
				<table className="w-full mb-12">
					<thead>
						<tr className="border-b border-t border-gray-200 bg-gray-50">
							<th
								scope="col"
								className="text-left py-2 px-1 xs:px-2 text-gray-800"
							>
								Date
							</th>
							<th
								scope="col"
								className="text-left py-2 px-1 xs:px-2 text-gray-800"
							>
								Type
							</th>
							<th
								scope="col"
								className="text-left py-2 px-1 xs:px-2 text-gray-800"
							>
								Title
							</th>
						</tr>
					</thead>
					<tbody>
						{entries.map((entry, index) => {
							return (
								<tr key={index} className="border-b border-gray-200">
									<td className="py-3 pr-1 xs:px-2 text-gray-900 align-top">
										<span title={entry['time']}>
											{entry['cleantime']}
										</span>
									</td>
									<td className="py-3 px-1 xs:px-2 text-gray-900 align-top">
										{entry['type']}
									</td>
									<td className="py-3 pl-1 xs:px-2 align-top">
										<External
											url={entry['url']}
											text={entry['title']}
										/>
									</td>
								</tr>
							);
						})}
						<tr className="border-b border-gray-200">
							<td colSpan={3} className="py-3 px-4 text-xl font-medium">
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
