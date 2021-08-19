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

export const BankruptcyStatistics = ({ data }: ActionStatisticsProps) => {
	const [showAll, setShowAll] = useState(false);
	const current = new Date().getFullYear();
	const total = sumObjectValues(data.annual);

	const yearArray = makeYearArray(data.years, current);
	const annual = leastMost(data.annual, current);
	const monthly = leastMost(data.monthly);

	return (
		<>
			<SEO
				title="Bankruptcy Statistics and Charts"
				description={`Statistics and charts for public company bankruptcies on the US stock market. Detailed data is available from 1998-${current}`}
				canonical="actions/bankruptcies/statistics/"
			/>
			<ActionsLayout title="Bankruptcy Statistics">
				<p className="text-base sm:text-lg mb-3 sm:mb-4">
					This page shows statistics and charts for public company
					bankruptcy liquidations on the US stock market.
				</p>
				<ActionsChart
					heading={`Bankruptcies Per Year 1998-${current}`}
					intro={`
					There have been ${total} public company bankruptcy liquidations
					since 1998. The most was in ${annual.most.key}, when ${annual.most.value} public companies went
					bankrupt. The least was in ${annual.least.key} with only ${annual.least.value} bankruptcies.`}
					title={`Bankruptcies 1998-${current}`}
					data={data.annual}
				/>

				<ActionsChart
					heading="Average Bankruptcies Per Month"
					intro={`In an average year, ${getFullMonth(
						monthly.most.key
					)} tends to have the highest number of bankruptcy
					liquidations, while ${getFullMonth(monthly.least.key)} has the lowest number.`}
					title="Bankruptcies Per Month"
					data={data.monthly}
				/>

				<ActionsChart
					heading={`Bankruptcies in ${current}`}
					intro={`There have been ${sumObjectValues(
						data.years[current]
					)} bankruptcies in ${current}, so far.`}
					title={`Monthly Bankruptcies in ${current}`}
					link={`/actions/bankruptcies/${current}/`}
					data={data.years[current]}
				/>

				<ActionsChart
					heading={`${current - 1}`}
					intro={`There were ${sumObjectValues(
						data.years[current - 1]
					)} bankruptcies in ${current - 1}.`}
					title={`${current - 1} Bankruptcies`}
					link={`/actions/bankruptcies/${current - 1}/`}
					data={data.years[current - 1]}
				/>

				<ActionsChart
					heading={`${current - 2}`}
					intro={`There were ${sumObjectValues(
						data.years[current - 2]
					)} bankruptcies in ${current - 2}.`}
					title={`${current - 2} Bankruptcies`}
					link={`/actions/bankruptcies/${current - 2}/`}
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
								)} bankruptcies in ${year}.`}
								title={`${year} Bankruptcies`}
								link={`/actions/bankruptcies/${year}/`}
								data={data.years[year]}
							/>
						);
					})}
			</ActionsLayout>
		</>
	);
};

export default BankruptcyStatistics;

export const getStaticProps: GetStaticProps = async () => {
	const data = await getActionsData('bankruptcies', 'stats');

	return {
		props: {
			data,
		},
		revalidate: 7200,
	};
};
