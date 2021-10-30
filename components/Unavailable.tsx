interface props {
	message: string;
	small?: boolean;
	classes?: string;
}

export function Unavailable({ message, small, classes }: props) {
	return (
		<div
			className={`h-full flex justify-center items-center text-center p-6 md:p-12 bg-gray-50 border border-gray-200 ${
				small ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
			} font-semibold rounded-sm${classes ? ' ' + classes : ''}`}
		>
			{message}
		</div>
	);
}
