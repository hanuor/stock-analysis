const capitalize = (word: string) => {
	const split = word.split('-');
	if (split.length === 1) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	} else {
		let capitalized = '';
		for (let i = 0; i < split.length; i++) {
			if (i > 0) {
				capitalized += ' ';
			}
			capitalized += split[i].charAt(0).toUpperCase() + split[i].slice(1);
		}
		return capitalized;
	}
};

export const getSchema = (path: string, title: string) => {
	const split = path.split('/');
	const one = split[0] || null;
	const two = split[1] || null;
	const three = split[2] || null;
	const four = split[3] || null;

	let obj: object | undefined;

	if (one === 'stocks' || one === 'etf') {
		let oneC: string | undefined;
		if (one === 'stocks') {
			oneC = 'Stocks';
		}
		if (one === 'etf') {
			oneC = 'ETF';
		}

		if (!two) {
			obj = {
				'@context': 'https://schema.org',
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						item: { '@id': 'https://stockanalysis.com/', name: 'Home' },
					},
					{
						'@type': 'ListItem',
						position: 2,
						item: {
							name: oneC,
						},
					},
				],
			};
		} else if (two && !three) {
			obj = {
				'@context': 'https://schema.org',
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						item: { '@id': 'https://stockanalysis.com/', name: 'Home' },
					},
					{
						'@type': 'ListItem',
						position: 2,
						item: {
							'@id': `https://stockanalysis.com/${one}/`,
							name: oneC,
						},
					},
					{
						'@type': 'ListItem',
						position: 3,
						item: { name: two.toUpperCase() },
					},
				],
			};
		} else if (three && !four) {
			obj = {
				'@context': 'https://schema.org',
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						item: { '@id': 'https://stockanalysis.com/', name: 'Home' },
					},
					{
						'@type': 'ListItem',
						position: 2,
						item: {
							'@id': `https://stockanalysis.com/${one}/`,
							name: oneC,
						},
					},
					{
						'@type': 'ListItem',
						position: 3,
						item: {
							'@id': `https://stockanalysis.com/${one}/${two.toLowerCase()}/`,
							name: two.toUpperCase(),
						},
					},
					{
						'@type': 'ListItem',
						position: 4,
						item: {
							name: capitalize(three),
						},
					},
				],
			};
		} else if (three && four) {
			obj = {
				'@context': 'https://schema.org',
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						item: { '@id': 'https://stockanalysis.com/', name: 'Home' },
					},
					{
						'@type': 'ListItem',
						position: 2,
						item: {
							'@id': `https://stockanalysis.com/${one}/`,
							name: oneC,
						},
					},
					{
						'@type': 'ListItem',
						position: 3,
						item: {
							'@id': `https://stockanalysis.com/${one}/${two.toLowerCase()}/`,
							name: two.toUpperCase(),
						},
					},
					{
						'@type': 'ListItem',
						position: 4,
						item: {
							'@id': `https://stockanalysis.com/${one}/${two.toLowerCase()}/${three.toLowerCase()}/`,
							name: capitalize(three),
						},
					},
					{
						'@type': 'ListItem',
						position: 5,
						item: {
							name: capitalize(four),
						},
					},
				],
			};
		}
	} else if (one === 'ipos') {
		let twoC: string | undefined;
		if (two === 'calendar' || two === 'news' || two === 'statistics') {
			twoC = 'IPO ' + capitalize(two);
		}

		if (!two) {
			obj = {
				'@context': 'https://schema.org',
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						item: { '@id': 'https://stockanalysis.com/', name: 'Home' },
					},
					{
						'@type': 'ListItem',
						position: 2,
						item: {
							name: 'Recent IPOs',
						},
					},
				],
			};
		} else if (two) {
			obj = {
				'@context': 'https://schema.org',
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						item: { '@id': 'https://stockanalysis.com/', name: 'Home' },
					},
					{
						'@type': 'ListItem',
						position: 2,
						item: {
							'@id': 'https://stockanalysis.com/ipos/',
							name: 'IPOs',
						},
					},
					{
						'@type': 'ListItem',
						position: 3,
						item: {
							'@id': `https://stockanalysis.com/ipos/${two.toLowerCase()}/`,
							name: twoC || two,
						},
					},
				],
			};
		}
	} else {
		if (one && !two) {
			obj = {
				'@context': 'https://schema.org',
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						item: { '@id': 'https://stockanalysis.com/', name: 'Home' },
					},
					{
						'@type': 'ListItem',
						position: 2,
						item: {
							'@id': `https://stockanalysis.com/${one.toLowerCase()}/`,
							name: title,
						},
					},
				],
			};
		} else if (one && two) {
			obj = {
				'@context': 'https://schema.org',
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						item: {
							'@id': 'https://stockanalysis.com/',
							name: 'Home',
						},
					},
					{
						'@type': 'ListItem',
						position: 2,
						item: {
							'@id': `https://stockanalysis.com/${one.toLowerCase()}/`,
							name: capitalize(one),
						},
					},
					{
						'@type': 'ListItem',
						position: 3,
						item: {
							'@id': `https://stockanalysis.com/${two.toLowerCase()}/`,
							name: title,
						},
					},
				],
			};
		}
	}

	if (obj) {
		return obj;
	}

	return null;
};
