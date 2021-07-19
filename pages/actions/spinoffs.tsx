import { GetStaticProps } from 'next';
import { SEO } from 'components/SEO';
import { getActionsData } from 'functions/callBackEnd';
import { ActionsNavigation } from 'components/Actions/ActionsNavigation';
import Breadcrumbs from 'components/Breadcrumbs/_Breadcrumbs';
import { NewsletterWidget } from 'components/Layout/Sidebar/Newsletter';
import { ActionsTable } from 'components/Actions/ActionsTable';
import { StockLink } from 'components/Links';

type Action = {
	date: string;
	name: string;
	oldsymbol: string;
	newymbol: string;
};

type CellString = {
	cell: {
		value: string;
	};
};

interface Props {
	data: Action[];
}

export const ActionsSpinoffs = ({ data }: Props) => {
	const columns = [
		{
			Header: 'Date',
			accessor: 'date',
		},
		{
			Header: 'Parent',
			accessor: 'oldsymbol',
			Cell: function FormatCell({ cell: { value } }: CellString) {
				if (value.startsWith('$')) {
					return <StockLink symbol={value.slice(1)} />;
				}
				return value;
			},
		},
		{
			Header: 'New Stock',
			accessor: 'newsymbol',
			Cell: function FormatCell({ cell: { value } }: CellString) {
				if (value.startsWith('$')) {
					return <StockLink symbol={value.slice(1)} />;
				}
				return value;
			},
		},
		{
			Header: 'New Company Name',
			accessor: 'name',
		},
	];

	return (
		<>
			<SEO
				title="Recent Stock Spinoffs"
				description="Latest spinoffs on the US stock market. A spinoff happens when a company splits part of itself into a new independent company."
				canonical="actions/spinoffs/"
			/>
			<div className="contain">
				<main className="w-full py-5 xs:py-6">
					<Breadcrumbs />
					<h1 className="hh1">Stock Spinoffs</h1>
					<ActionsNavigation />

					<div className="lg:grid lg:grid-cols-sidebar gap-x-10">
						<div className="py-3">
							<ActionsTable
								title="Spinoffs"
								columndata={columns}
								rowdata={data}
							/>
						</div>
						<aside className="flex flex-col space-y-10 py-6">
							<NewsletterWidget />
						</aside>
					</div>
				</main>
			</div>
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
		revalidate: 3600,
	};
};
