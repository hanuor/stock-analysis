/* This example requires Tailwind CSS v2.0+ */

const btnclasses =
	'py-1 px-0.5 xs:px-[3px] bp:px-1.5 sm:px-2 rounded-md focus:outline-none text-gray-900 hover:text-gray-900 hover:text-shadow';

export default function Buttons(props) {
	return (
		<>
			<select
				onChange={(e) =>
					props.dispatcher({
						type: 'timeChange',
						value: e.target.value,
					})
				}
				id="period"
				name="period"
				className="block sm:hidden pl-3 border-r border-gray-300 pr-10 py-2 border-0 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm bp:text-base"
				defaultValue="1Y">
				<option value="1M">1 Month</option>
				<option value="6M">6 Months</option>
				<option value="YTD">YTD</option>
				<option value="1Y">1 Year</option>
				<option value="3Y">3 Years</option>
				<option value="5Y">5 Years</option>
				<option value="MAX">MAX</option>
			</select>
			<ul className="hidden sm:flex flex-row whitespace-nowrap overflow-x-auto">
				<li>
					<button
						onClick={() =>
							props.dispatcher({ type: 'timeChange', value: '1M' })
						}
						type="button"
						className={btnclasses}>
						1 Month
					</button>
				</li>
				<li>
					<button
						onClick={() =>
							props.dispatcher({ type: 'timeChange', value: '6M' })
						}
						type="button"
						className={btnclasses}>
						6 Months
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
						1 Year
					</button>
				</li>
				<li>
					<button
						onClick={() =>
							props.dispatcher({ type: 'timeChange', value: '3Y' })
						}
						type="button"
						className={btnclasses}>
						3 Years
					</button>
				</li>
				<li>
					<button
						onClick={() =>
							props.dispatcher({ type: 'timeChange', value: '5Y' })
						}
						type="button"
						className={btnclasses}>
						5 Years
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
		</>
	);
}
