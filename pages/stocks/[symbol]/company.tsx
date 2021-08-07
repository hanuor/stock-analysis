import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Info } from 'types/Info';
import { Company } from 'types/Company';
import { Stock } from 'components/Layout/StockLayout';
import { SEO } from 'components/SEO';
import { getPageData } from 'functions/callBackEnd';
import { ProfileDescription } from 'components/ProfilePage/ProfileDescription';
import { ProfileInfo } from 'components/ProfilePage/ProfileInfo';
import { ProfileContact } from 'components/ProfilePage/ProfileContact';
import { ProfileDetails } from 'components/ProfilePage/ProfileDetails';
import { ProfileExecutives } from 'components/ProfilePage/ProfileExecutives';
import { ProfileSECfilings } from 'components/ProfilePage/ProfileSECfilings';

interface Props {
	info: Info;
	data: Company;
}

const SymbolStatistics = ({ info, data }: Props) => {
	return (
		<Stock info={info}>
			<SEO
				title={`${info.name} (${info.ticker}) Company Profile & Overview`}
				description={`Company profile for ${info.name}, including a description, list of executives, contact details and other key facts.`}
				canonical={`stocks/${info.symbol}/company/`}
			/>
			<div className="contain mt-4 sm:mt-5 lg:mt-6">
				<div className="float-none lg:float-left lg:profilewrap">
					<ProfileDescription text={data.description} />
				</div>

				<div className="float-none lg:float-right lg:max-w-[336px]">
					<ProfileInfo info={data.info} logo={data.logo} />
					<ProfileContact contact={data.contact} />
					<ProfileDetails details={data.stockDetails} />
				</div>

				<div className="float-none lg:float-left lg:profilewrap mb-2">
					<ProfileExecutives executives={data.executives} />
					<ProfileSECfilings
						id={info.id}
						filings={data.secFilings}
						cik={data.stockDetails.cik}
					/>
				</div>
			</div>
			<div className="clear-both min-h-5"></div>
		</Stock>
	);
};
export default SymbolStatistics;

interface IParams extends ParsedUrlQuery {
	symbol: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { symbol } = params as IParams;
	const { info, data } = await getPageData('profile', symbol);

	if (info === 'redirect') {
		return {
			redirect: {
				destination: data,
				statusCode: 301,
			},
		};
	}

	return {
		props: {
			key: symbol,
			info,
			data,
		},
		revalidate: 3600,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return { paths: [], fallback: 'blocking' };
};
