export const CloseIcon = ({ classes }: { classes: string }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={classes}
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			style={{ maxWidth: '40px' }}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M6 18L18 6M6 6l12 12"
			/>
		</svg>
	);
};
