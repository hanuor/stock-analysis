// Validate an email address
export const validateEmailAddress = (emailAddress: string) => {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(emailAddress).toLowerCase());
};

// Validate the length of a string
export const validateLength = (str: string, min: number) => {
	return str.length >= min;
};

// Validate that a URL bit is valid, no ?/&/#
export const validateUrlBit = (bit: string | null | undefined) => {
	if (!bit) {
		return null;
	}

	if (
		bit.charAt(0) === '#' ||
		bit.charAt(0) === '?' ||
		bit.charAt(0) === '%'
	) {
		return null;
	}

	return bit;
};
