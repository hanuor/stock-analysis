import { GetStaticProps } from 'next';
import { SEO } from 'components/SEO';
import { getActionsData } from 'functions/callBackEnd';
import { ActionsLayout } from 'components/Actions/ActionsLayout';
import { ActionsTable } from 'components/Actions/ActionsTable';
import { StockLink } from 'components/Links';
import { CellString, ActionProps } from 'components/Actions/actions.types';

export const ActionsDelisted = ({ data }: ActionProps) => {
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
				title="Latest Delisted Stocks"
				description="Stocks that have been delisted from the US stock market. Some have gone bankrupt or been acquired, others have been delisted for other reasons."
				canonical="/actions/delisted/"
			/>
			<ActionsLayout title="Delisted Stocks" url="/actions/delisted/">
				<ActionsTable
					key="Delistings"
					title="Delistings"
					columndata={columns}
					rowdata={data.data}
					fullCount={data.fullCount}
					type="delisted"
				/>
			</ActionsLayout>
		</>
	);
};

export default ActionsDelisted;

export const getStaticProps: GetStaticProps = async () => {
	const data = await getActionsData('delisted');

	return {
		props: {
			data,
		},
		revalidate: 7200,
	};
};
