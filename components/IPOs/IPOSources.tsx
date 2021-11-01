export function IPOSources() {
	return (
		<div className="text-sm text-gray-700 pt-2 sm:pt-0">
			<span className="font-medium">Sources:</span> Most data is sourced from
			the S-1 and S-1/A filings that companies submit to the U.S. Securities
			and Exchange Commission (
			<a
				href="https://www.sec.gov/cgi-bin/browse-edgar?company=&CIK=&type=s-1&owner=include&count=40&action=getcurrent"
				target="_blank"
				rel="noopener noreferrer"
				className="bll"
			>
				SEC
			</a>
			). IPO dates are sourced from SEC filings, press releases, roadshow
			presentations, NASDAQ, NYSE and others. IPO dates are estimated and may
			change, and in some cases companies postpone or withdraw their plans.
		</div>
	);
}
