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

export const ActionsChanges = ({ data }: Props) => {
	const columns = [
		{
			Header: 'Date',
			accessor: 'date',
		},
		{
			Header: 'Old',
			accessor: 'oldsymbol',
			Cell: function FormatCell({ cell: { value } }: CellString) {
				if (value.startsWith('$')) {
					return <StockLink symbol={value.slice(1)} />;
				}
				return value;
			},
		},
		{
			Header: 'New',
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
				title="Latest Stock Symbol Changes"
				description="Latest stock ticker symbol changes. Companies change stock symbols for different reasons, including when they change their company name or complete a merger."
				canonical="actions/changes/"
			/>
			<div className="contain">
				<main className="w-full py-5 xs:py-6">
					<Breadcrumbs />
					<h1 className="hh1">Stock Symbol Changes</h1>
					<ActionsNavigation />

					<div className="lg:grid lg:grid-cols-sidebar gap-x-10">
						<div className="py-3">
							<ActionsTable
								title="Changes"
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
export default ActionsChanges;

export const getStaticProps: GetStaticProps = async () => {
	const data = await getActionsData('changes');

	return {
		props: {
			data,
		},
		revalidate: 3600,
	};
};
