export const HamburgerIcon = ({ classes }: { classes: string }) => {
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
				d="M4 6h16M4 12h16M4 18h16"
			/>
		</svg>
	);
};
