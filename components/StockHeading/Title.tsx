import { Info } from 'types/Info';
import { InformationCircleIcon } from 'components/Icons/InformationCircle';
import { TitleByline } from './TitleByline';

export const Title = ({ info }: { info: Info }) => {
	if (typeof info.symbol === 'undefined') {
		return null;
	}

	const noticeStyles =
		info.state === 'upcomingipo'
			? 'text-base sm:text-lg text-gray-800 mt-2'
			: 'text-base text-gray-700 mt-3';

	const iconStyles =
		info.state === 'upcomingipo'
			? 'h-4 xs:h-5 sm:h-6 w-4 xs:w-5 sm:w-6 text-blue-400 inline mb-1 mr-1'
			: 'h-4 xs:h-5 w-4 xs:w-5 text-blue-400 inline mb-1 mr-1';

	const name = info.nameFull || info.name;

	return (
		<div className="mb-4">
			<h1 className="text-2xl sm:text-[26px] font-bold text-gray-900">
				{`${name} (${info.ticker})`}
			</h1>
			{info.quote && info.state !== 'upcomingipo' && !info.archived && (
				<TitleByline info={info} />
			)}
			{info.notice && (
				<div className={noticeStyles}>
					<span>
						<InformationCircleIcon classes={iconStyles} />
					</span>
					<span>{info.notice}</span>
				</div>
			)}
		</div>
	);
};
