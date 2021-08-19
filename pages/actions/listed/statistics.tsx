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

export const ListedStatistics = ({ data }: ActionStatisticsProps) => {
	const [showAll, setShowAll] = useState(false);
	const current = new Date().getFullYear();
	const total = sumObjectValues(data.annual);

	const yearArray = makeYearArray(data.years, current);
	const annual = leastMost(data.annual, current);
	const monthly = leastMost(data.monthly);

	return (
		<>
			<SEO
				title="New Stock Listings: Statistics and Charts"
				description={`Statistics and charts for new stock listings on the US stock market. Annual data is available from 1998-${current}`}
				canonical="actions/listed/statistics/"
			/>
			<ActionsLayout title="Stock Listing Statistics">
				<p className="text-lg mb-4">
					This page shows statistics and charts for new common stock
					listings on the US stock market. It focuses on common shares that
					were listed on the main US exchanges (NYSE and NASDAQ). These
					statistics do not include stock units, preferred shares or blank
					check companies.
				</p>
				<ActionsChart
					heading={`Listings Per Year 1998-${current}`}
					intro={`
					There have been ${total} stock listings
					since 1998. The most was in ${annual.most.key}, when ${annual.most.value} public companies were listed. The least was in ${annual.least.key} with only ${annual.least.value} listings.`}
					title={`Listings 1998-${current}`}
					data={data.annual}
				/>

				<ActionsChart
					heading="Average Listings Per Month"
					intro={`In an average year, ${getFullMonth(
						monthly.most.key
					)} tends to have the highest number of listings, while ${getFullMonth(
						monthly.least.key
					)} has the lowest number.`}
					title="Listings Per Month"
					data={data.monthly}
				/>

				<ActionsChart
					heading={`Listings in ${current}`}
					intro={`There have been ${sumObjectValues(
						data.years[current]
					)} listings in ${current}, so far.`}
					title={`Monthly Listings in ${current}`}
					link={`/actions/listed/${current}/`}
					data={data.years[current]}
				/>

				<ActionsChart
					heading={`${current - 1}`}
					intro={`There were ${sumObjectValues(
						data.years[current - 1]
					)} listings in ${current - 1}.`}
					title={`${current - 1} Listings`}
					link={`/actions/listed/${current - 1}/`}
					data={data.years[current - 1]}
				/>

				<ActionsChart
					heading={`${current - 2}`}
					intro={`There were ${sumObjectValues(
						data.years[current - 2]
					)} listings in ${current - 2}.`}
					title={`${current - 2} Listings`}
					link={`/actions/listed/${current - 2}/`}
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
								)} listings in ${year}.`}
								title={`${year} Listings`}
								link={`/actions/listed/${year}/`}
								data={data.years[year]}
							/>
						);
					})}
			</ActionsLayout>
		</>
	);
};

export default ListedStatistics;

export const getStaticProps: GetStaticProps = async () => {
	const data = await getActionsData('listed', 'stats');

	return {
		props: {
			data,
		},
		revalidate: 7200,
	};
};
