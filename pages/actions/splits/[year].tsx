import { GetStaticPaths, GetStaticProps } from 'next';
import { SEO } from 'components/SEO';
import { getActionsData } from 'functions/callBackEnd';
import { ActionsLayout } from 'components/Actions/ActionsLayout';
import { ActionsTable } from 'components/Actions/ActionsTable';
import { StockLink } from 'components/Links';
import { ParsedUrlQuery } from 'querystring';
import { CellString, ActionProps } from 'components/Actions/actions.types';
import { ActionsPaywall } from 'components/Actions/ActionsPaywall';

export const ActionsSplitsYear = ({ year, data }: ActionProps) => {
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
			accessor: 'splitType',
		},
		{
			Header: 'Split Ratio',
			accessor: 'splitRatio',
		},
		{
			Header: 'Company Name',
			accessor: 'name',
		},
	];

	return (
		<>
			<SEO
				title={`All ${year} Stock Splits`}
				description={`A list of all stock splits on the US stock market in ${year}, including both regular (forward) and reverse splits.`}
				canonical={`/actions/splits/${year}/`}
			/>
			<ActionsLayout
				title={`${year} Stock Splits`}
				url={`/actions/splits/${year}/`}
			>
				<ActionsTable
					key={`Splits-${year}`}
					title="Splits"
					columndata={columns}
					rowdata={data.data}
					fullCount={data.fullCount}
					type="splits"
					year={year}
				/>
				<ActionsPaywall
					count={data.data.length}
					fullCount={data.fullCount}
					title="Stock Splits"
				/>
			</ActionsLayout>
		</>
	);
};

export default ActionsSplitsYear;

interface IParams extends ParsedUrlQuery {
	year: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { year } = params as IParams;
	const data = await getActionsData('splits', year);

	return {
		props: {
			year,
			data,
		},
		revalidate: Number(year) === new Date().getFullYear() ? 7200 : false,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	// Generate paths for all the years with existing data
	const current = new Date().getFullYear();
	const last = 1998;
	const diff = current - last;

	const params = [];
	for (let i = 0; i < diff + 1; i++) {
		params.push({ params: { year: `${last + i}` } });
	}

	return {
		paths: params,
		fallback: false,
	};
};
