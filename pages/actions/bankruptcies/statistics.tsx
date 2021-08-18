import { GetStaticProps } from 'next';
import { getActionsData } from 'functions/callBackEnd';
import { ActionsLayout } from 'components/Actions/ActionsLayout';

export const BankruptcyStatistics = () => {
	return (
		<ActionsLayout title="Bankruptcy Statistics">
			<div>Here is a chart</div>
		</ActionsLayout>
	);
};

export default BankruptcyStatistics;

export const getStaticProps: GetStaticProps = async () => {
	const data = await getActionsData('bankruptcies');

	return {
		props: {
			data,
		},
		revalidate: 7200,
	};
};
