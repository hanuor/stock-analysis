import { LayoutFullWidth } from '../components/Layout/LayoutFullWidth';
import { Portfolio } from 'components/Portfolio/_Portfolio';

export default function PortfolioPage() {
	return (
		<LayoutFullWidth>
			<div className="contain pt-5 xs:pt-6">
				<Portfolio />
			</div>
		</LayoutFullWidth>
	);
}
