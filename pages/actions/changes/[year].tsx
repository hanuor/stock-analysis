import { GetStaticProps, GetStaticPaths } from 'next';
import { SEO } from 'components/SEO';
import { getActionsData } from 'functions/callBackEnd';
import { ActionsNavigation } from 'components/Actions/ActionsNavigation';
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs';
import { NewsletterWidget } from 'components/Layout/Sidebar/Newsletter';
import { ActionsTable } from 'components/Actions/ActionsTable';
import { StockLink } from 'components/Links';
import { Sidebar1 } from 'components/Ads/GPT/Sidebar1';
import { ActionsNavigationSub } from 'components/Actions/ActionsNavigationSub';
import { ParsedUrlQuery } from 'querystring';

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
	year: string;
	data: Action[];
}

export const ActionsChangesYear = ({ year, data }: Props) => {
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
				title={`${year} Stock Ticker Symbol Changes`}
				description={`A list of all stock ticker symbol changes in ${year}, including all public companies listed on the main US exchanges.`}
				canonical={`actions/changes/${year}/`}
			/>
			<div className="contain">
				<main className="w-full py-5 xs:py-6">
					<Breadcrumbs />
					<h1 className="hh1">{`${year} Symbol Changes`}</h1>
					<ActionsNavigation />

					<div className="lg:grid lg:grid-cols-sidebar gap-x-10">
						<div className="py-1.5">
							<ActionsNavigationSub />
							<ActionsTable
								title="Changes"
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
export default ActionsChangesYear;

interface IParams extends ParsedUrlQuery {
	year: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { year } = params as IParams;
	const data = await getActionsData('changes', year);

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
