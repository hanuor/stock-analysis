import { GetStaticPaths, GetStaticProps } from 'next';
import { SEO } from 'components/SEO';
import { getActionsData } from 'functions/callBackEnd';
import { ActionsLayout } from 'components/Actions/ActionsLayout';
import { ActionsTable } from 'components/Actions/ActionsTable';
import { StockLink } from 'components/Links';
import { ParsedUrlQuery } from 'querystring';
import { CellString, ActionProps } from 'components/Actions/actions.types';
import { ActionsPaywall } from 'components/Actions/ActionsPaywall';

export const ActionsDelistedYear = ({ year, data }: ActionProps) => {
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
				title={`All ${year} Delisted Stocks`}
				description={`A list of stocks that were delisted in the year ${year}. The list includes public companies trading on the main US exchanges (NYSE and NASDAQ).`}
				canonical={`actions/delisted/${year}/`}
			/>
			<ActionsLayout title={`${year} Delisted Stocks`}>
				<ActionsTable
					key={`Delistings-${year}`}
					title="Delistings"
					columndata={columns}
					rowdata={data.data}
					fullCount={data.fullCount}
					type="delisted"
					year={year}
				/>
				<ActionsPaywall
					count={data.data.length}
					fullCount={data.fullCount}
					title="Delistings"
				/>
			</ActionsLayout>
		</>
	);
};

export default ActionsDelistedYear;

interface IParams extends ParsedUrlQuery {
	year: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { year } = params as IParams;
	const data = await getActionsData('delisted', year);

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
