export const formatDateTimestamp = (string) => {
	let datetime = new Date(string);
	let timestamp = datetime.toLocaleString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
	return timestamp;
};

export const formatDateClean = (string) => {
	let datetime = new Date(string);
	let date = datetime.toLocaleString('en-US', {
		timeZone: 'America/New_York',
		day: 'numeric',
		year: 'numeric',
		month: 'short',
	});
	return date;
};

export const formatDateMinute = (string) => {
	let datetime = new Date(string);
	let date = datetime.toLocaleString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
	});
	return date;
};

export const formatDateHour = (string) => {
	let datetime = new Date(string);
	let date = datetime.toLocaleString('en-US', {
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
	});
	return date;
};

export const formatDateDay = (string) => {
	let datetime = new Date(string);
	let date = datetime.toLocaleString('en-US', {
		timeZone: 'America/New_York',
		month: 'short',
		day: 'numeric',
	});
	return date;
};

export const formatDateMonth = (string) => {
	let datetime = new Date(string);
	let date = datetime.toLocaleString('en-US', {
		timeZone: 'America/New_York',
		year: 'numeric',
		month: 'short',
	});
	return date;
};

export const formatDateYear = (string) => {
	let datetime = new Date(string);
	let date = datetime.toLocaleString('en-US', {
		timeZone: 'America/New_York',
		year: 'numeric',
	});
	return date;
};
