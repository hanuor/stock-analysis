import { GetStaticPaths, GetStaticProps } from 'next';
import { SEO } from 'components/SEO';
import { getActionsData } from 'functions/callBackEnd';
import { ActionsLayout } from 'components/Actions/ActionsLayout';
import { ActionsTable } from 'components/Actions/ActionsTable';
import { StockLink } from 'components/Links';
import { ParsedUrlQuery } from 'querystring';
import { CellString, ActionProps } from 'components/Actions/actions.types';
import { ActionsPaywall } from 'components/Actions/ActionsPaywall';

export const ActionsAllYear = ({ year, data }: ActionProps) => {
	if (Number(year) === new Date().getFullYear()) {
		data.data = data.data.filter((d) => d.date.slice(-4) === year);
	}

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
				title={`All ${year} Corporate Actions`}
				description={`A list of all corporate actions in the year ${year}. It includes public companies with stocks listed on the main US exchanges.`}
				canonical={`actions/${year}/`}
			/>
			<ActionsLayout title={`${year} Corporate Actions`}>
				<ActionsTable
					key={`Actions-${year}`}
					title="Actions"
					columndata={columns}
					rowdata={data.data}
					fullCount={data.fullCount}
					type="all"
					year={year}
				/>
				<ActionsPaywall
					count={data.data.length}
					fullCount={data.fullCount}
					title="Actions"
				/>
			</ActionsLayout>
		</>
	);
};
export default ActionsAllYear;

interface IParams extends ParsedUrlQuery {
	year: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { year } = params as IParams;
	const data = await getActionsData('all', year);

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
