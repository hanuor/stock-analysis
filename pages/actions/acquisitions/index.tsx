import { GetStaticProps } from 'next';
import { SEO } from 'components/SEO';
import { getActionsData } from 'functions/callBackEnd';
import { ActionsNavigation } from 'components/Actions/ActionsNavigation';
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs';
import { NewsletterWidget } from 'components/Layout/Sidebar/Newsletter';
import { ActionsTable } from 'components/Actions/ActionsTable';
import Link from 'next/link';
import { StockLink } from 'components/Links';
import { Sidebar1 } from 'components/Ads/GPT/Sidebar1';
import { ActionsNavigationSub } from 'components/Actions/ActionsNavigationSub';

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
	data: Action[];
}

export const ActionsAcquisitions = ({ data }: Props) => {
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
				canonical="actions/acquisitions/"
			/>
			<div className="contain">
				<main className="w-full py-5 xs:py-6">
					<Breadcrumbs />
					<h1 className="hh1">Recent Mergers & Acquisitions</h1>
					<ActionsNavigation />

					<div className="lg:grid lg:grid-cols-sidebar gap-x-10">
						<div className="py-1.5">
							<ActionsNavigationSub />
							<ActionsTable
								title="Acquisitions"
								columndata={columns}
								rowdata={data}
							/>
						</div>
						<aside className="flex flex-col space-y-10 py-6">
							<NewsletterWidget />
							<Sidebar1 />
						</aside>
					</div>
				</main>
			</div>
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
