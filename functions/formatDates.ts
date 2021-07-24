export const formatDateTimestamp = (string: string) => {
	const datetime = new Date(string);
	const timestamp = datetime.toLocaleString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
	return timestamp;
};

export const formatDateClean = (string: string) => {
	const datetime = new Date(string);
	const date = datetime.toLocaleString('en-US', {
		day: 'numeric',
		year: 'numeric',
		month: 'short',
	});
	return date;
};

export const formatDateMinute = (string: string) => {
	const datetime = new Date(string);
	const date = datetime.toLocaleString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
	});
	return date;
};

export const formatDateHour = (string: string) => {
	const datetime = new Date(string);
	const date = datetime.toLocaleString('en-US', {
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
	});
	return date;
};

export const formatDateDay = (string: string) => {
	const datetime = new Date(string);
	const date = datetime.toLocaleString('en-US', {
		timeZone: 'America/New_York',
		month: 'short',
		day: 'numeric',
	});
	return date;
};

export const formatDateMonth = (string: string) => {
	const datetime = new Date(string);
	const date = datetime.toLocaleString('en-US', {
		timeZone: 'America/New_York',
		year: 'numeric',
		month: 'short',
	});
	return date;
};

export const formatDateYear = (string: string) => {
	const datetime = new Date(string);
	const date = datetime.toLocaleString('en-US', {
		timeZone: 'America/New_York',
		year: 'numeric',
	});
	const dateNum = parseInt(date);
	return dateNum;
};
