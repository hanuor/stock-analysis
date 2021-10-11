import { AddSymbol } from 'components/Portfolio/AddSymbol';
import { PortfolioTable } from 'components/Portfolio/PortfolioTable';
import { usePortfolioList } from './usePortfolioList';
import Link from 'next/link';

export function Portfolio({ id }: { id: string }) {
	const { data } = usePortfolioList();
	const title = data?.find((item: any) => item.id == id)?.name;

	return (
		<div>
			<h1 className="hh2">
				<Link href="/portfolio">
					<a className="bll">All Portfolios</a>
				</Link>
				{' > '}
				{title || 'Portfolio'}
			</h1>
			<AddSymbol id={id} />
			<PortfolioTable id={id} />
		</div>
	);
}
