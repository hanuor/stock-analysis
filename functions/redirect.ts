export const redirect = (data: string) => {
	return {
		redirect: {
			destination: data,
			statusCode: 301,
		},
	};
};
