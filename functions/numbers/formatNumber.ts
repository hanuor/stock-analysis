export const formatNumber = (
	num: number,
	min: number,
	max: number,
	append = ''
) => {
	return (
		new Intl.NumberFormat('en-US', {
			minimumFractionDigits: min,
			maximumFractionDigits: max,
		}).format(num) + append
	);
};
