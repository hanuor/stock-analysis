export const IconMoon = () => {
	return (
		<span className="text-blue-400 inline">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-4 w-4 mt-1 sm:mt-0"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
				/>
			</svg>
		</span>
	);
};

export const IconSun = () => {
	return (
		<span className="text-yellow-500">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 sm:h-4 sm:w-4"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
				/>
			</svg>
		</span>
	);
};

export const HoverChartIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		strokeWidth="1.5"
		fill="none"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
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
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M16 13V11.5H10V9.5H16V8L19 10.5L16 13Z" fill="currentColor" />
		<path d="M8 17V15.5H14V13.5H8V12L5 14.5L8 17Z" fill="currentColor" />
	</svg>
);

export const MenuDropDown = ({ classes }) => (
	<svg className={classes} viewBox="0 0 20 20" fill="currentColor">
		<path
			fillRule="evenodd"
			d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
			clipRule="evenodd"
		></path>
	</svg>
);

export const SortUp = ({ classes }) => (
	<svg className={classes} viewBox="0 0 20 20" fill="currentColor">
		<path
			fillRule="evenodd"
			d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
			clipRule="evenodd"
		/>
	</svg>
);

export const SortDown = ({ classes }) => (
	<svg className={classes} viewBox="0 0 20 20" fill="currentColor">
		<path
			fillRule="evenodd"
			d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
			clipRule="evenodd"
		/>
	</svg>
);
