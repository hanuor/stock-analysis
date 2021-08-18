import { GetStaticProps } from 'next';
import { getActionsData } from 'functions/callBackEnd';
import { SEO } from 'components/SEO';
import { ActionsLayout } from 'components/Actions/ActionsLayout';
import { ActionsChart } from 'components/Actions/ActionsChart';
import { sumObjectValues } from 'components/Actions/actions.functions';

interface Props {
	data: {
		annual: {
			[key: string]: number;
		};
		monthly: {
			[key: string]: number;
		};
		years: {
			[key: string]: {
				[key: string]: number;
			};
		};
	};
}

export const BankruptcyStatistics = ({ data }: Props) => {
	const year = new Date().getFullYear();
	const total = sumObjectValues(data.annual);

	return (
		<>
			<SEO
				title="Bankruptcy Statistics and Charts"
				description={`Statistics and charts for public company bankruptcies on the US stock market. Annual data is available from 1998-${year}`}
				canonical="actions/bankruptcies/statistics/"
			/>
			<ActionsLayout title="Bankruptcy Statistics">
				<ActionsChart
					heading={`Bankruptcies Per Year 1998-${year}`}
					intro={`
					There have been ${total} public company bankruptcy liquidations
					since 1998. The most was in 2001, when 284 public companies went
					bankrupt. The least was in 2007 with only 59 bankruptcies.`}
					title={`Bankruptcies 1998-${year}`}
					data={data.annual}
				/>

				<ActionsChart
					heading="Average Bankruptcies Per Month"
					intro="December tends to have the highest number of bankruptcy
					liquidations per month, on average."
					title="Bankruptcies Per Month"
					data={data.monthly}
				/>

				<ActionsChart
					heading={`Bankruptcies in ${year}`}
					intro={`There have been ${sumObjectValues(
						data.years[year]
					)} bankruptcies in ${year}, so far.`}
					title={`Monthly Bankruptcies in ${year}`}
					data={data.years[year]}
				/>

				<ActionsChart
					heading={`${year - 1}`}
					title={`${year - 1} Bankruptcies`}
					data={data.years[year - 1]}
				/>
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
