import { GetStaticProps } from 'next';
import { SEO } from 'components/SEO';
import { getActionsData } from 'functions/callBackEnd';
import { ActionsLayout } from 'components/Actions/ActionsLayout';
import { ActionsTable } from 'components/Actions/ActionsTable';
import Link from 'next/link';
import { StockLink } from 'components/Links';
import { CellString, ActionProps } from 'components/Actions/actions.types';

export const ActionsAcquisitions = ({ data }: ActionProps) => {
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
				title="Recent Mergers and Acquisitions"
				description={`A list of recent and historical mergers and acquisitions on the US stock market, including detailed history from 1998 to ${new Date().getFullYear()}.`}
				canonical="/actions/acquisitions/"
			/>
			<ActionsLayout
				title="Mergers & Acquisitions"
				url="/actions/acquisitions/"
			>
				<ActionsTable
					key="Acquisitions"
					title="Acquisitions"
					columndata={columns}
					rowdata={data.data}
					fullCount={data.fullCount}
					type="acquisitions"
				/>
			</ActionsLayout>
		</>
	);
};

export default ActionsAcquisitions;

export const getStaticProps: GetStaticProps = async () => {
	const data = await getActionsData('acquisitions');

	return {
		props: {
			data,
		},
		revalidate: 7200,
	};
};
