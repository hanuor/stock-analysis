import Title from '@/components/Stocks/Title';
import StockPrice from '@/components/Stocks/StockPrice';
import TabNavigation from '@/components/Stocks/TabNavigation';
import Breadcrumbs from '@/components/Breadcrumbs/_Breadcrumbs';

export default function StockHeading() {
	return (
		<div className="mx-auto px-3 xs:px-4 lg:px-6 mb-4 sm:mb-5">
			<Breadcrumbs />
			<Title />
			<StockPrice />
			<TabNavigation />
		</div>
	);
}
