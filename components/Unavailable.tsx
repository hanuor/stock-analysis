interface UnavailableI {
	message: string;
	small?: boolean;
	classes?: string;
}

export const Unavailable = ({ message, small, classes }: UnavailableI) => (
	<div
		className={`h-full flex justify-center items-center text-center p-6 md:p-12 bg-gray-50 border border-gray-200 ${
			small ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
		} font-semibold rounded-sm${classes ? ' ' + classes : ''}`}
	>
		{message}
	</div>
);
