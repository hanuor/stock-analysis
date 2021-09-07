import { GetStaticProps } from 'next';
import { ScreenerData } from 'components/StockScreener/screener.types';
import { getData } from 'functions/API';
import { LayoutFullWidth } from 'components/Layout/LayoutFullWidth';
import { SEO } from 'components/SEO';
import { StockScreener } from 'components/StockScreener/_StockScreener';

export default function StockScreenerPage({ stocks }: ScreenerData) {
	return (
		<>
			<SEO
				title="Stock Screener"
				description="The best stock screener that exists on the internet."
				canonical="stock-screener/"
			/>
			<LayoutFullWidth>
				<div className="contain my-6">
					<StockScreener stocks={stocks} />
				</div>
			</LayoutFullWidth>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const stocks = await getData('screener?type=initial');

	return {
		props: {
			stocks,
		},
		revalidate: 6 * 60 * 60,
	};
};
