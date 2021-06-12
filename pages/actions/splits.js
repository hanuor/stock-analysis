import Meta from '@/components/Meta';
import Header from '@/Layout/Header';
import Footer from '@/Layout/Footer';
import { getActionsData } from '@/Functions/fetchStockInfo';
import ActionsNavigation from '@/components/Actions/ActionsNavigation';
import Breadcrumbs from '@/components/Breadcrumbs/_Breadcrumbs';
import { NewsletterWidget } from '@/components/Layout/Sidebar/Newsletter';
import ActionsTable from '@/components/Actions/ActionsTable';
import StockLink from '@/components/StockLink';

const ActionsAll = ({ data }) => {
	const columns = [
		{
			Header: 'Date',
			accessor: 'date',
		},
		{
			Header: 'Symbol',
			accessor: 'symbol',
			Cell: function FormatCell({ cell: { value } }) {
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
			<Meta title="Stock Splits" />
			<Header />
			<div className="contain">
				<main className="w-full py-5 xs:py-6">
					<Breadcrumbs />
					<h1 className="hh1">Stock Splits</h1>
					<ActionsNavigation />

					<div className="lg:grid lg:grid-cols-sidebar gap-x-10">
						<div className="py-3">
							<ActionsTable
								title="Splits"
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
			<Footer />
		</>
	);
};

export default ActionsAll;

export async function getStaticProps() {
	const data = await getActionsData('splits');

	return {
		props: {
			data,
		},
		revalidate: 600,
	};
}