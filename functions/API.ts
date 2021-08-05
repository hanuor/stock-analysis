export const getData = async (params: string) => {
	const url =
		process.env.NEXT_PUBLIC_API_URL ||
		process.env.API_URL ||
		'https://stockanalysis.com/wp-json/sa';

	const response = await fetch(`${url}/${params}`);

	if (response.ok) {
		return await response.json();
	}

	throw new Error(`getData not ok: ${response.status} ${response.statusText}`);
};
