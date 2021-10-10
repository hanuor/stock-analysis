import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { LayoutFullWidth } from 'components/Layout/LayoutFullWidth';
import { Portfolio } from 'components/Portfolio/_Portfolio';

export default function PortfolioPage({ id }: { id: string }) {
	return (
		<LayoutFullWidth>
			<div className="contain pt-5 xs:pt-6">
				<Portfolio id={id} />
			</div>
		</LayoutFullWidth>
	);
}

interface IParams extends ParsedUrlQuery {
	id: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { id } = params as IParams;
	return {
		props: {
			id,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return { paths: [], fallback: 'blocking' };
};
