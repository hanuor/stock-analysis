export const HoverChartIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		strokeWidth="1.5"
		fill="none"
		strokeLinecap="round"
		strokeLinejoin="round">
		<path stroke="none" d="M0 0h24v24H0z" />
		<rect x="3" y="12" width="6" height="8" rx="1" />
		<rect x="9" y="8" width="6" height="12" rx="1" />
		<rect x="15" y="4" width="6" height="16" rx="1" />
		<line x1="4" y1="20" x2="18" y2="20" />
	</svg>
);

export const LeftRightSwitch = ({ classes }) => (
	<svg
		className={classes}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path d="M16 13V11.5H10V9.5H16V8L19 10.5L16 13Z" fill="currentColor" />
		<path d="M8 17V15.5H14V13.5H8V12L5 14.5L8 17Z" fill="currentColor" />
	</svg>
);

export const MenuDropDown = ({ classes }) => (
	<svg className={classes} viewBox="0 0 20 20" fill="currentColor">
		<path
			fillRule="evenodd"
			d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
			clipRule="evenodd"></path>
	</svg>
);
