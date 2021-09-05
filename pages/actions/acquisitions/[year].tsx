import { GetStaticPaths, GetStaticProps } from 'next';
import { SEO } from 'components/SEO';
import { getActionsData } from 'functions/callBackEnd';
import { ActionsLayout } from 'components/Actions/ActionsLayout';
import { ActionsTable } from 'components/Actions/ActionsTable';
import Link from 'next/link';
import { StockLink } from 'components/Links';
import { ParsedUrlQuery } from 'querystring';
import { CellString, ActionProps } from 'components/Actions/actions.types';
import { ActionsPaywall } from 'components/Actions/ActionsPaywall';

export const ActionsAcquisitionsYear = ({ year, data }: ActionProps) => {
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
			accessor: 'oldname',
			Cell: function FormatCell({ cell: { value } }: CellString) {
				return <span title={value}>{value}</span>;
			},
		},
		{
			Header: 'Acquired By',
			accessor: 'newname',
			Cell: function FormatCell({ cell: { value } }: CellString) {
				if (value.includes('$')) {
					const sliced = value.split('$');
					const symbol = sliced[0];
					const name = sliced[1];
					return (
						<Link
							href={`/stocks/${symbol.toLowerCase()}/`}
							prefetch={false}
						>
							<a className="bll" title={name}>
								{name}
							</a>
						</Link>
					);
				}
				return value;
			},
		},
	];

	return (
		<>
			<SEO
				title={`List of ${year} Mergers & Acquisitions`}
				description={`A list of all public company mergers and acquisitions on the US stock market in the year ${year}.`}
				canonical={`/actions/acquisitions/${year}/`}
			/>
			<ActionsLayout
				title={`${year} Mergers & Acquisitions`}
				url={`/actions/acquisitions/${year}/`}
			>
				<ActionsTable
					key={`Acquisitions-${year}`}
					title="Acquisitions"
					columndata={columns}
					rowdata={data.data}
					fullCount={data.fullCount}
					type="acquisitions"
					year={year}
				/>
				<ActionsPaywall
					count={data.data.length}
					fullCount={data.fullCount}
					title="Acquisitions"
				/>
			</ActionsLayout>
		</>
	);
};

export default ActionsAcquisitionsYear;

interface IParams extends ParsedUrlQuery {
	year: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { year } = params as IParams;
	const data = await getActionsData('acquisitions', year);

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
