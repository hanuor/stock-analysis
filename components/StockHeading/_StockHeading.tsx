import { Info } from 'types/Info';
import { Title } from 'components/StockHeading/Title';
import StockPrice from 'components/StockHeading/StockPrice';
import { TabNavigation } from 'components/StockHeading/TabNavigation';
import { TabNavigationETF } from 'components/StockHeading/TabNavigationETF';
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs';

export default function StockHeading({
	info,
	url,
}: {
	info: Info;
	url: string;
}) {
	return (
		<div className="mx-auto px-3 xs:px-4 lg:px-6 mb-2">
			<Breadcrumbs url={url} />
			<Title info={info} />
			<StockPrice info={info} />
			{info.type === 'stocks' ? (
				<TabNavigation
					symbol={info.symbol}
					hideChart={info.exceptions.hideChart}
				/>
			) : (
				<TabNavigationETF symbol={info.symbol} />
			)}
		</div>
	);
}
