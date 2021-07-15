import Title from 'components/StockHeading/Title';
import StockPrice from 'components/StockHeading/StockPrice';
import TabNavigation from 'components/StockHeading/TabNavigation';
import ETFNavigation from 'components/StockHeading/TabNavigationETF';
import Breadcrumbs from 'components/Breadcrumbs/_Breadcrumbs';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

interface Props {
	type: string;
	id: number;
}

export default function StockHeading({ type, id }: Props) {
	return (
		<div className="mx-auto px-3 xs:px-4 lg:px-6 mb-4 sm:mb-5">
			<Breadcrumbs />
			<Title />
			<QueryClientProvider client={queryClient}>
				<StockPrice id={id} />
			</QueryClientProvider>
			{type === 'etf' ? <ETFNavigation /> : <TabNavigation />}
		</div>
	);
}
