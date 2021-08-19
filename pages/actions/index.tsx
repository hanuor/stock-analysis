import { GetStaticProps } from 'next';
import { SEO } from 'components/SEO';
import { getActionsData } from 'functions/callBackEnd';
import { ActionsLayout } from 'components/Actions/ActionsLayout';
import { ActionsTable } from 'components/Actions/ActionsTable';
import { StockLink } from 'components/Links';
import { CellString, ActionProps } from 'components/Actions/actions.types';

export const ActionsAll = ({ data }: ActionProps) => {
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
			Header: 'Type',
			accessor: 'type',
		},
		{
			Header: 'Action',
			accessor: 'text',
		},
	];

	return (
		<>
			<SEO
				title="Corporate Actions List - Recent and Historical"
				description="A comprehensive list of recent and historical corporate actions and stock changes for companies listed on the US stock market."
				canonical="actions/"
			/>
			<ActionsLayout title="Recent Corporate Actions">
				<ActionsTable title="Actions" columndata={columns} rowdata={data} />
			</ActionsLayout>
		</>
	);
};
export default ActionsAll;

export const getStaticProps: GetStaticProps = async () => {
	const data = await getActionsData('all');

	return {
		props: {
			data,
		},
		revalidate: 3600,
	};
};
