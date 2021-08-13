import { FinancialReport, Statement } from 'types/Financials';

export function getValidCount(
	statement: Statement,
	fullcount: number,
	data: FinancialReport
) {
	let validcount = fullcount;

	if (statement === 'ratios') {
		const valid = data.marketcap.filter((item) => item != null).length;

		if (valid < fullcount) {
			validcount = valid;
		}
	}

	if (statement === 'balance_sheet') {
		const valid = data.assets.filter((item) => item != null).length;

		if (valid < fullcount) {
			validcount = fullcount - 1;
		}
	}

	return validcount;
}
