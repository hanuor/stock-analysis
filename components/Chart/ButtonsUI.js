/* This example requires Tailwind CSS v2.0+ */

const btnclasses =
	'text-smaller py-1 px-0.5 xs:px-[3px] bp:px-1.5 sm:px-2 rounded-md focus:outline-none text-gray-900 hover:text-gray-900 hover:text-shadow';

export default function Buttons(props) {
	return (
		<ul className="flex flex-row overflow-x-auto">
			<li>
				<button
					onClick={() =>
						props.dispatcher({ type: 'timeChange', value: '1M' })
					}
					type="button"
					className={btnclasses}>
					<span className="block sm:hidden lg:block xl:hidden">1M</span>
					<span className="hidden sm:block lg:hidden xl:block">
						1 Month
					</span>
				</button>
			</li>
			<li>
				<button
					onClick={() =>
						props.dispatcher({ type: 'timeChange', value: '6M' })
					}
					type="button"
					className={btnclasses}>
					<span className="block sm:hidden lg:block xl:hidden">6M</span>
					<span className="hidden sm:block lg:hidden xl:block">
						6 Months
					</span>
				</button>
			</li>

			<li>
				<button
					onClick={() =>
						props.dispatcher({ type: 'timeChange', value: 'YTD' })
					}
					type="button"
					className={btnclasses}>
					YTD
				</button>
			</li>
			<li>
				<button
					onClick={() =>
						props.dispatcher({ type: 'timeChange', value: '1Y' })
					}
					type="button"
					className={btnclasses}>
					<span className="block sm:hidden lg:block xl:hidden">1Y</span>
					<span className="hidden sm:block lg:hidden xl:block">
						1 Year
					</span>
				</button>
			</li>
			<li>
				<button
					onClick={() =>
						props.dispatcher({ type: 'timeChange', value: '3Y' })
					}
					type="button"
					className={btnclasses}>
					<span className="block sm:hidden lg:block xl:hidden">3Y</span>
					<span className="hidden sm:block lg:hidden xl:block">
						3 Years
					</span>
				</button>
			</li>
			<li>
				<button
					onClick={() =>
						props.dispatcher({ type: 'timeChange', value: '5Y' })
					}
					type="button"
					className={btnclasses}>
					<span className="block sm:hidden lg:block xl:hidden">5Y</span>
					<span className="hidden sm:block lg:hidden xl:block">
						5 Years
					</span>
				</button>
			</li>
			<li>
				<button
					onClick={() =>
						props.dispatcher({ type: 'timeChange', value: 'MAX' })
					}
					type="button"
					className={btnclasses}>
					MAX
				</button>
			</li>
		</ul>
	);
}
