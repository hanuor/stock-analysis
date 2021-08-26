interface UnavailableI {
	message: string;
	small?: boolean;
	classes?: string;
}

export const Unavailable = ({ message, small, classes }: UnavailableI) => (
	<div
		className={`h-full flex justify-center items-center text-center p-4 md:p-12 bg-gray-50 border border-gray-200 ${
			small ? 'text-xl' : 'text-3xl'
		} font-semibold rounded-sm${classes ? ' ' + classes : ''}`}
	>
		{message}
	</div>
);
