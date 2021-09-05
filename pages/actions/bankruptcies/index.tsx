import { GetStaticProps } from 'next';
import { SEO } from 'components/SEO';
import { getActionsData } from 'functions/callBackEnd';
import { ActionsLayout } from 'components/Actions/ActionsLayout';
import { ActionsTable } from 'components/Actions/ActionsTable';
import { StockLink } from 'components/Links';
import { CellString, ActionProps } from 'components/Actions/actions.types';

export const ActionsBankruptcies = ({ data }: ActionProps) => {
	const columns = [
		{
			Header: 'Date',
			accessor: 'date',
		},
		{
			Header: 'Symbol',
			accessor: 'symbol',
			Cell: function FormatCell({ cell: { value } }: CellString) {
				if (value.startsWith('$')) {
					return <StockLink symbol={value.slice(1)} />;
				}
				return value;
			},
		},
		{
			Header: 'Company Name',
			accessor: 'name',
		},
	];

	return (
		<>
			<SEO
				title="Recent Stock Bankruptcies"
				description="A list of recent and historical bankruptcy liquidations of public companies listed on the US stock market."
				canonical="/actions/bankruptcies/"
			/>
			<ActionsLayout title="Bankruptcies" url="/actions/bankruptcies/">
				<ActionsTable
					key="Bankruptcies"
					title="Bankruptcies"
					columndata={columns}
					rowdata={data.data}
					fullCount={data.fullCount}
					type="bankruptcies"
				/>
			</ActionsLayout>
		</>
	);
};

export default ActionsBankruptcies;

export const getStaticProps: GetStaticProps = async () => {
	const data = await getActionsData('bankruptcies');

	return {
		props: {
			data,
		},
		revalidate: 7200,
	};
};
