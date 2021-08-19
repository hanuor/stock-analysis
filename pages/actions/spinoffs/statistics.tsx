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
} from 'components/Actions/actions.functions';
import { ActionStatisticsProps } from 'components/Actions/actions.types';

export const SpinoffsStatistics = ({ data }: ActionStatisticsProps) => {
	const [showAll, setShowAll] = useState(false);
	const current = new Date().getFullYear();
	const total = sumObjectValues(data.annual);

	const yearArray = makeYearArray(data.years, current);
	const annual = leastMost(data.annual, current);

	return (
		<>
			<SEO
				title="Stock Spinoff Statistics and Charts"
				description={`Statistics on stock spinoffs on the US stock market. Detailed data is available from 1998-${current}.`}
				canonical="actions/spinoffs/statistics/"
			/>
			<ActionsLayout title="Stock Spinoff Statistics">
				<ActionsChart
					heading={`Spinoffs Per Year 1998-${current}`}
					intro={`
					There have been ${total} stock spinoffs
					since 1998. The most was in ${annual.most.key} with ${annual.most.value} spinoffs. The least was in ${annual.least.key} with only ${annual.least.value}.`}
					title={`Spinoffs 1998-${current}`}
					data={data.annual}
				/>

				<ActionsChart
					heading={`Spinoffs in ${current}`}
					intro={`There have been ${sumObjectValues(
						data.years[current]
					)} spinoffs in ${current}, so far.`}
					title={`Monthly Spinoffs in ${current}`}
					link={`/actions/spinoffs/${current}/`}
					data={data.years[current]}
				/>

				<ActionsChart
					heading={`${current - 1}`}
					intro={`There were ${sumObjectValues(
						data.years[current - 1]
					)} spinoffs in ${current - 1}.`}
					title={`${current - 1} Spinoffs`}
					link={`/actions/spinoffs/${current - 1}/`}
					data={data.years[current - 1]}
				/>

				<ActionsChart
					heading={`${current - 2}`}
					intro={`There were ${sumObjectValues(
						data.years[current - 2]
					)} spinoffs in ${current - 2}.`}
					title={`${current - 2} Spinoffs`}
					link={`/actions/spinoffs/${current - 2}/`}
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
								)} spinoffs in ${year}.`}
								title={`${year} Spinoffs`}
								link={`/actions/spinoffs/${year}/`}
								data={data.years[year]}
							/>
						);
					})}
			</ActionsLayout>
		</>
	);
};

export default SpinoffsStatistics;

export const getStaticProps: GetStaticProps = async () => {
	const data = await getActionsData('spinoffs', 'stats');

	return {
		props: {
			data,
		},
		revalidate: 7200,
	};
};
