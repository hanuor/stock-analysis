interface PathInterface {
	path: string;
}

const capitalize = (word: string) => {
	console.log(word);
	const split = word.split('-');
	console.log(split.length);
	if (split.length === 1) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	} else {
		let compound = '';
		for (let i = 0; i < split.length; i++) {
			compound += split[i].charAt(0).toUpperCase() + split[i].slice(1);
		}
		return compound;
	}
};

export const BreadcrumbSchema = ({ path }: PathInterface) => {
	const split = path.split('/');
	const one = split[0] || null;
	const two = split[1] || null;
	const three = split[2] || null;
	const four = split[3] || null;

	let string = `{"@context": "https://schema.org","@type": "BreadcrumbList","itemListElement": [{"@type": "ListItem","position": 1,"item": {"@id": "https://stockanalysis.com/","name": "Home"}}`;

	if (one === 'stocks') {
		string += `, {"@type": "ListItem", "position": 2, "item": { "@id": "https://stockanalysis.com/stocks/", "name": "Stocks" } }`;

		if (two && !three) {
			string +=
				`, {"@type": "ListItem", "position": 3, "item": { "name": "` +
				two.toUpperCase() +
				`" } }`;
		}
		if (two && three) {
			string +=
				`, {"@type": "ListItem", "position": 3, "item": { "@id": "https://stockanalysis.com/stocks/` +
				two.toLowerCase() +
				`/", "name": "` +
				two.toUpperCase() +
				`" } }`;

			if (three === 'financials') {
				if (!four) {
					string += `, {"@type": "ListItem","position": 4,"item": {"name": "Financials"}}`;
				} else {
					string +=
						`, {"@type": "ListItem", "position": 4, "item": { "@id": "https://stockanalysis.com/stocks/` +
						two.toLowerCase() +
						`/financials/", "name": "Financials"}}`;
					string +=
						`, {"@type": "ListItem", "position": 5, "item": { "name": "` +
						capitalize(four) +
						`" }}`;
				}
			}
		}
	}

	string += `]}`;

	if (one === 'etf') {
	}

	if (one === 'ipos') {
	}

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: string }}
		></script>
	);
};

// {
// 	one === 'stocks' &&
// 		`{
//                 "@type": "ListItem",
//                 "position": 2,
//                 "item": {
//                     "@id": "https://stockanalysis.com/stocks/",
//                     "name": "Stocks"
//                 }
//             }`;
// }
// {
// 	two &&
// 		`{
//                 "@type": "ListItem",
//                 "position": 3,
//                 "item": {
//                     "name": "AAPL"
//                 }
//             }`;
// }
// {
// 	`]`;
// }
