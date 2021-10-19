const NO_ADS = [
	'about',
	'login',
	'pro',
	'contact',
	'privacy-policy',
	'terms-of-use',
	'subscribe',
];

export function noAds(path: string | null) {
	return path ? NO_ADS.includes(path) : false;
}
