export function IPOSources() {
	return (
		<div className="text-sm text-gray-700 pt-2 sm:pt-0">
			<span className="font-medium">Source:</span>{' '}
			<a
				href="https://rapidapi.com/stock-analysis-stock-analysis-default/api/upcoming-ipo-calendar"
				target="_blank"
				rel="noopener noreferrer"
				className="bll"
				id="tag-ext-calendar-source-api"
			>
				Upcoming IPO Calendar API
			</a>
			. Most data is sourced from the S-1 filings that companies submit to
			the U.S. Securities and Exchange Commission. IPO dates are sourced from
			SEC filings, press releases, roadshow presentations, NASDAQ, NYSE and
			others. IPO dates are estimated and may change, and in some cases
			companies postpone or withdraw their plans.
		</div>
	);
}
