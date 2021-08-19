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

export const ChangesStatistics = ({ data }: ActionStatisticsProps) => {
	const [showAll, setShowAll] = useState(false);
	const current = new Date().getFullYear();
	const total = sumObjectValues(data.annual);

	const yearArray = makeYearArray(data.years, current);
	const annual = leastMost(data.annual, current);
	const monthly = leastMost(data.monthly);

	return (
		<>
			<SEO
				title="Stock Symbol Change Statistics"
				description={`Statistics on stock symbol changes on the US stock market. Data is available since 1998`}
				canonical="actions/changes/statistics/"
			/>
			<ActionsLayout title="Stock Symbol Change Statistics">
				<ActionsChart
					heading={`Changes Per Year 1998-${current}`}
					intro={`
					There have been ${total} stock symbol changes
					since 1998. The most was in ${annual.most.key} with ${annual.most.value} changes. The least was in ${annual.least.key} with ${annual.least.value} changes.`}
					title={`Changes 1998-${current}`}
					data={data.annual}
				/>

				<ActionsChart
					heading="Average Changes Per Month"
					intro={`In an average year, ${getFullMonth(
						monthly.most.key
					)} tends to have the highest number of stock ticker symbol changes, while ${getFullMonth(
						monthly.least.key
					)} has the lowest number.`}
					title="Changes Per Month"
					data={data.monthly}
				/>

				<ActionsChart
					heading={`Changes in ${current}`}
					intro={`There have been ${sumObjectValues(
						data.years[current]
					)} changes in ${current}, so far.`}
					title={`Monthly Changes in ${current}`}
					link={`/actions/changes/${current}/`}
					data={data.years[current]}
				/>

				<ActionsChart
					heading={`${current - 1}`}
					intro={`There were ${sumObjectValues(
						data.years[current - 1]
					)} changes in ${current - 1}.`}
					title={`${current - 1} Changes`}
					link={`/actions/changes/${current - 1}/`}
					data={data.years[current - 1]}
				/>

				<ActionsChart
					heading={`${current - 2}`}
					intro={`There were ${sumObjectValues(
						data.years[current - 2]
					)} changes in ${current - 2}.`}
					title={`${current - 2} Changes`}
					link={`/actions/changes/${current - 2}/`}
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
								)} changes in ${year}.`}
								title={`${year} Changes`}
								link={`/actions/changes/${year}/`}
								data={data.years[year]}
							/>
						);
					})}
			</ActionsLayout>
		</>
	);
};

export default ChangesStatistics;

export const getStaticProps: GetStaticProps = async () => {
	const data = await getActionsData('changes', 'stats');

	return {
		props: {
			data,
		},
		revalidate: 7200,
	};
};
