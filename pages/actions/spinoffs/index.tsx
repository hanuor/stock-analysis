import { GetStaticProps } from 'next';
import { SEO } from 'components/SEO';
import { getActionsData } from 'functions/callBackEnd';
import { ActionsLayout } from 'components/Actions/ActionsLayout';
import { ActionsTable } from 'components/Actions/ActionsTable';
import { StockLink } from 'components/Links';
import { CellString, ActionProps } from 'components/Actions/actions.types';

export const ActionsSpinoffs = ({ data }: ActionProps) => {
	const columns = [
		{
			Header: 'Date',
			accessor: 'date',
		},
		{
			Header: 'Parent',
			accessor: 'old',
			Cell: function FormatCell({ cell: { value } }: CellString) {
				if (value.startsWith('$')) {
					return <StockLink symbol={value.slice(1)} />;
				}
				return value;
			},
		},
		{
			Header: 'New Stock',
			accessor: 'symbol',
			Cell: function FormatCell({ cell: { value } }: CellString) {
				if (value.startsWith('$')) {
					return <StockLink symbol={value.slice(1)} />;
				}
				return value;
			},
		},
		{
			Header: 'Parent Company',
			accessor: 'oldname',
			Cell: function FormatCell({ cell: { value } }: CellString) {
				return <span title={value}>{value}</span>;
			},
		},
		{
			Header: 'New Company',
			accessor: 'name',
			Cell: function FormatCell({ cell: { value } }: CellString) {
				return <span title={value}>{value}</span>;
			},
		},
	];

	return (
		<>
			<SEO
				title={`Recent Stock Spinoffs: 1998-${new Date().getFullYear()}`}
				description="Recent and historical spinoffs on the US stock market. A spinoff happens when a company splits part of itself into a new, independent company."
				canonical="/actions/spinoffs/"
			/>
			<ActionsLayout title="Stock Spinoffs" url="/actions/spinoffs/">
				<ActionsTable
					key="Spinoffs"
					title="Spinoffs"
					columndata={columns}
					rowdata={data.data}
					fullCount={data.fullCount}
					type="spinoffs"
				/>
			</ActionsLayout>
		</>
	);
};

export default ActionsSpinoffs;

export const getStaticProps: GetStaticProps = async () => {
	const data = await getActionsData('spinoffs');

	return {
		props: {
			data,
		},
		revalidate: 7200,
	};
};
