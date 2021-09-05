import { GetStaticProps } from 'next';
import { SEO } from 'components/SEO';
import { getActionsData } from 'functions/callBackEnd';
import { ActionsLayout } from 'components/Actions/ActionsLayout';
import { ActionsTable } from 'components/Actions/ActionsTable';
import { StockLink } from 'components/Links';
import { CellString, ActionProps } from 'components/Actions/actions.types';

export const ActionsListed = ({ data }: ActionProps) => {
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
				title="Most Recently Listed Stocks"
				description="Recent and historical listings on the US stock market. Includes both IPOs and stocks listed for other reasons."
				canonical="/actions/listed/"
			/>
			<ActionsLayout title="Listed Stocks" url="/actions/listed/">
				<ActionsTable
					key="listings"
					title="Listings"
					columndata={columns}
					rowdata={data.data}
					fullCount={data.fullCount}
					type="listed"
				/>
			</ActionsLayout>
		</>
	);
};

export default ActionsListed;

export const getStaticProps: GetStaticProps = async () => {
	const data = await getActionsData('listed');

	return {
		props: {
			data,
		},
		revalidate: 7200,
	};
};
