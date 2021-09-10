interface IProps {
	classes: string;
}

export const LeftRightIcon = ({ classes }: IProps) => (
	<svg
		className={classes}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		style={{ maxWidth: '40px' }}
	>
		<path d="M16 13V11.5H10V9.5H16V8L19 10.5L16 13Z" fill="currentColor" />
		<path d="M8 17V15.5H14V13.5H8V12L5 14.5L8 17Z" fill="currentColor" />
	</svg>
);
