import { LayoutFullWidth } from 'components/Layout/LayoutFullWidth';
import { PortfolioList } from 'components/Portfolio/_PortfolioList';

export default function PortfolioPage() {
	return (
		<LayoutFullWidth>
			<div className="contain pt-5 xs:pt-6">
				<PortfolioList />
			</div>
		</LayoutFullWidth>
	);
}
