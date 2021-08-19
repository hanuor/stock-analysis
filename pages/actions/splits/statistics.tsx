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
import { ActionSplitsProps } from 'components/Actions/actions.types';

export const SplitsStatistics = ({ data }: ActionSplitsProps) => {
	const [showAll, setShowAll] = useState(false);
	const current = new Date().getFullYear();
	const totalForward = sumObjectValues(data.annual.forward);
	const totalReverse = sumObjectValues(data.annual.reverse);

	const yearArray = makeYearArray(data.years.forward, current);
	const annualForward = leastMost(data.annual.forward, current);
	const annualReverse = leastMost(data.annual.reverse, current);
	const monthlyForward = leastMost(data.monthly.forward);
	const monthlyReverse = leastMost(data.monthly.reverse);

	return (
		<>
			<SEO
				title="Stock Split Statistics and Charts"
				description={`Statistics on stock splits on the US stock market. Detailed data is available from 1998-${current}.`}
				canonical="actions/splits/statistics/"
			/>
			<ActionsLayout title="Stock Split Statistics">
				<ActionsChart
					heading={`Stock Splits Per Year 1998-${current}`}
					intro={`
					There have been ${totalForward} regular (forward) stock splits
					since 1998. The most was in ${annualForward.most.key} with ${annualForward.most.value} splits. The least was in ${annualForward.least.key} with only ${annualForward.least.value}.`}
					title={`Stock Splits 1998-${current}`}
					data={data.annual.forward}
				/>

				<ActionsChart
					heading={`Reverse Splits Per Year 1998-${current}`}
					intro={`
					There have been ${totalReverse} reverse stock splits
					since 1998. The most was in ${annualReverse.most.key} with ${annualReverse.most.value} splits. The least was in ${annualReverse.least.key} with only ${annualReverse.least.value}.`}
					title={`Reverse Splits 1998-${current}`}
					data={data.annual.reverse}
				/>

				<ActionsChart
					heading="Average Stock Splits Per Month"
					intro={`In an average year, ${getFullMonth(
						monthlyForward.most.key
					)} tends to have the highest number of stock splits, while ${getFullMonth(
						monthlyForward.least.key
					)} has the lowest number.`}
					title="Average Stock Splits Per Month"
					data={data.monthly.forward}
				/>

				<ActionsChart
					heading="Average Reverse Splits Per Month"
					intro={`In an average year, ${getFullMonth(
						monthlyReverse.most.key
					)} tends to have the highest number of reverse stock splits, while ${getFullMonth(
						monthlyReverse.least.key
					)} has the lowest number.`}
					title="Reverse Splits Per Month"
					data={data.monthly.reverse}
				/>

				<ActionsChart
					heading={`Stock Splits in ${current}`}
					intro={`There have been ${sumObjectValues(
						data.years.forward[current]
					)} forward splits and ${sumObjectValues(
						data.years.reverse[current]
					)} reverse splits in ${current}, so far.`}
					title={`${current} Stock Splits`}
					link={`/actions/splits/${current}/`}
					data={data.years.forward[current]}
				/>

				<ActionsChart
					title={`${current} Reverse Splits`}
					data={data.years.reverse[current]}
				/>

				<ActionsChart
					heading={`${current - 1}`}
					intro={`There were ${sumObjectValues(
						data.years.forward[current - 1]
					)} forward splits and ${sumObjectValues(
						data.years.reverse[current - 1]
					)} reverse splits in ${current - 1}.`}
					title={`${current - 1} Stock Splits`}
					link={`/actions/splits/${current - 1}/`}
					data={data.years.forward[current - 1]}
				/>

				<ActionsChart
					title={`${current - 1} Reverse Splits`}
					data={data.years.reverse[current - 1]}
				/>

				<ActionsChart
					heading={`${current - 2}`}
					intro={`There were ${sumObjectValues(
						data.years.forward[current - 2]
					)} forward splits and ${sumObjectValues(
						data.years.reverse[current - 2]
					)} reverse splits in ${current - 2}.`}
					title={`${current - 2} Stock Splits`}
					link={`/actions/splits/${current - 2}/`}
					data={data.years.forward[current - 2]}
				/>

				<ActionsChart
					title={`${current - 2} Reverse Splits`}
					data={data.years.reverse[current - 2]}
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
							<div key={year}>
								<ActionsChart
									heading={`${year}`}
									intro={`There were ${sumObjectValues(
										data.years.forward[year]
									)} forward splits and ${sumObjectValues(
										data.years.reverse[year]
									)} reverse splits in ${year}.`}
									title={`${year} Stock Splits`}
									link={`/actions/splits/${year}/`}
									data={data.years.forward[year]}
								/>
								<ActionsChart
									title={`${year} Reverse Splits`}
									data={data.years.reverse[year]}
								/>
							</div>
						);
					})}
			</ActionsLayout>
		</>
	);
};

export default SplitsStatistics;

export const getStaticProps: GetStaticProps = async () => {
	const data = await getActionsData('splits', 'stats');

	return {
		props: {
			data,
		},
		revalidate: 7200,
	};
};
