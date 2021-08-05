import { Info } from 'types/Info';
import { Quote } from 'types/Quote';
import { InformationCircleIcon } from 'components/Icons/InformationCircle';

const getQuoteSource = (quote: Quote) => {
	if (
		(quote.status === 'open' || quote.status === 'closed') &&
		quote.exchange !== 'OTCMKTS'
	) {
		return 'IEX Real-Time Price';
	}
	return 'Delayed Price';
};

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
				<div className="text-tiny text-gray-600 mt-[1px]">
					{`${info.quote.exchange || info.exchange}: ${
						info.ticker
					} · ${getQuoteSource(info.quote)} · USD`}
				</div>
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
