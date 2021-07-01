import Title from '@/components/StockHeading/Title';
import StockPrice from '@/components/StockHeading/StockPrice';
import TabNavigation from '@/components/StockHeading/TabNavigation';
import ETFNavigation from '@/components/StockHeading/TabNavigationETF';

import Breadcrumbs from '@/components/Breadcrumbs/_Breadcrumbs';

export default function StockHeading({type, id}) {
	return (
		<div className="mx-auto px-3 xs:px-4 lg:px-6 mb-4 sm:mb-5">
			<Breadcrumbs />
			<Title />
			<StockPrice id={id} />
			{type === 'etf' ? <ETFNavigation /> : <TabNavigation />}
		</div>
	);
}
