import { FinancialReport, Statement } from 'types/Financials';

export function getValidCount(
	statement: Statement,
	fullcount: number,
	data: FinancialReport
) {
	let validcount = fullcount;

	if (statement === 'ratios' && data) {
		const valid = data.marketcap.filter((item) => item != null).length;

		if (valid < fullcount) {
			validcount = valid;
		}
	}

	if (statement === 'balance_sheet' && data) {
		const valid = data.assets.filter((item) => item != null).length;

		if (valid < fullcount) {
			validcount = fullcount - 1;
		}
	}

	return validcount;
}
