import { useState } from 'react';
import { GetStaticProps } from 'next';
import { getActionsData } from 'functions/callBackEnd';
import { SEO } from 'components/SEO';
import { ActionsLayout } from 'components/Actions/ActionsLayout';
import { ActionsChart } from 'components/Actions/ActionsChart';
import {
	sumObjectValues,
	makeYearArray,
	leastMost,
	getFullMonth,
} from 'components/Actions/actions.functions';
import { ActionStatisticsProps } from 'components/Actions/actions.types';

export const AcquisitionsStatistics = ({ data }: ActionStatisticsProps) => {
	const [showAll, setShowAll] = useState(false);
	const current = new Date().getFullYear();
	const total = sumObjectValues(data.annual);

	const yearArray = makeYearArray(data.years, current);
	const annual = leastMost(data.annual, current);
	const monthly = leastMost(data.monthly);

	return (
		<>
			<SEO
				title="Mergers and Acquisitions: Statistics and Charts"
				description={`Statistics and charts for mergers and acquisitions on the US stock market. Detailed data is available from 1998-${current}`}
				canonical="actions/acquisitions/statistics/"
			/>
			<ActionsLayout title="Merger & Acquisition Statistics">
				<p className="text-base sm:text-lg mb-3 sm:mb-4">
					This page shows statistics for mergers and acquisitions of public
					companies listed on the US stock market.
				</p>
				<ActionsChart
					heading={`Acquisitions Per Year 1998-${current}`}
					intro={`
					There have been ${total} public company mergers and acquisitions
					since 1998. The most was in ${annual.most.key} when ${annual.most.value} public companies were acquired. The least was in ${annual.least.key} with only ${annual.least.value}.`}
					title={`Acquisitions 1998-${current}`}
					data={data.annual}
				/>

				<ActionsChart
					heading="Average Acquisitions Per Month"
					intro={`In an average year, ${getFullMonth(
						monthly.most.key
					)} tends to have the highest number of acquisitions, while ${getFullMonth(
						monthly.least.key
					)} has the lowest number.`}
					title="Acquisitions Per Month"
					data={data.monthly}
				/>

				<ActionsChart
					heading={`Acquisitions in ${current}`}
					intro={`There have been ${sumObjectValues(
						data.years[current]
					)} acquisitions in ${current}, so far.`}
					title={`Monthly Acquisitions in ${current}`}
					link={`/actions/acquisitions/${current}/`}
					data={data.years[current]}
				/>

				<ActionsChart
					heading={`${current - 1}`}
					intro={`There were ${sumObjectValues(
						data.years[current - 1]
					)} acquisitions in ${current - 1}.`}
					title={`${current - 1} Acquisitions`}
					link={`/actions/acquisitions/${current - 1}/`}
					data={data.years[current - 1]}
				/>

				<ActionsChart
					heading={`${current - 2}`}
					intro={`There were ${sumObjectValues(
						data.years[current - 2]
					)} acquisitions in ${current - 2}.`}
					title={`${current - 2} Acquisitions`}
					link={`/actions/acquisitions/${current - 2}/`}
					data={data.years[current - 2]}
				/>

				{!showAll && (
					<button
						className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-lg font-medium rounded-sm shadow-sm text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4"
						onClick={() => setShowAll(true)}
					>{`See ${current - 3}-1998`}</button>
				)}

				{showAll &&
					yearArray.map((year) => {
						return (
							<ActionsChart
								key={year}
								heading={`${year}`}
								intro={`There were ${sumObjectValues(
									data.years[year]
								)} acquisitions in ${year}.`}
								title={`${year} Acquisitions`}
								link={`/actions/acquisitions/${year}/`}
								data={data.years[year]}
							/>
						);
					})}
			</ActionsLayout>
		</>
	);
};

export default AcquisitionsStatistics;

export const getStaticProps: GetStaticProps = async () => {
	const data = await getActionsData('acquisitions', 'stats');

	return {
		props: {
			data,
		},
		revalidate: 7200,
	};
};
