import { GetStaticPaths, GetStaticProps } from 'next';
import { SEO } from 'components/SEO';
import { getActionsData } from 'functions/callBackEnd';
import { ActionsLayout } from 'components/Actions/ActionsLayout';
import { ActionsTable } from 'components/Actions/ActionsTable';
import { StockLink } from 'components/Links';
import { ParsedUrlQuery } from 'querystring';

type Action = {
	date: string;
	name: string;
	symbol: string;
};

type CellString = {
	cell: {
		value: string;
	};
};

interface Props {
	year: string;
	data: Action[];
}

export const ActionsBankruptciesYear = ({ year, data }: Props) => {
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
				title={`All ${year} Public Company Bankruptcies`}
				description={`A list of ${year} public company bankruptcies. It includes companies who had their stock listed on the US stock market.`}
				canonical={`actions/bankruptcies/${year}/`}
			/>
			<ActionsLayout title={`${year} Bankruptcies`}>
				<ActionsTable
					title="Bankruptcies"
					columndata={columns}
					rowdata={data}
				/>
			</ActionsLayout>
		</>
	);
};

export default ActionsBankruptciesYear;

interface IParams extends ParsedUrlQuery {
	year: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { year } = params as IParams;
	const data = await getActionsData('bankruptcies', year);

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
