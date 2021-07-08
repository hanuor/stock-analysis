const common =
	'py-0.5 px-0.5 xs:px-[3px] bp:px-1.5 sm:px-3 rounded-md focus:outline-none';
const active = common + ' bp:bg-gray-100 text-gray-800 font-semibold';
const inactive =
	common + ' text-gray-900 hover:text-gray-900 hover:text-shadow';

export default function Buttons({ state, dispatch }) {
	return (
		<>
			<select
				onChange={(e) =>
					dispatch({
						type: 'timeChange',
						value: e.target.value,
					})
				}
				id="period"
				name="period"
				className="block sm:hidden pl-3 border-r border-gray-300 pr-10 py-2 border-0 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm bp:text-base"
				defaultValue="1Y"
			>
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
						onClick={() => dispatch({ type: 'timeChange', value: '1M' })}
						type="button"
						className={state.time === '1M' ? active : inactive}
					>
						1 Month
					</button>
				</li>
				<li>
					<button
						onClick={() => dispatch({ type: 'timeChange', value: '6M' })}
						type="button"
						className={state.time === '6M' ? active : inactive}
					>
						6 Months
					</button>
				</li>

				<li>
					<button
						onClick={() => dispatch({ type: 'timeChange', value: 'YTD' })}
						type="button"
						className={state.time === 'YTD' ? active : inactive}
					>
						YTD
					</button>
				</li>
				<li>
					<button
						onClick={() => dispatch({ type: 'timeChange', value: '1Y' })}
						type="button"
						className={state.time === '1Y' ? active : inactive}
					>
						1 Year
					</button>
				</li>
				<li>
					<button
						onClick={() => dispatch({ type: 'timeChange', value: '3Y' })}
						type="button"
						className={state.time === '3Y' ? active : inactive}
					>
						3 Years
					</button>
				</li>
				<li>
					<button
						onClick={() => dispatch({ type: 'timeChange', value: '5Y' })}
						type="button"
						className={state.time === '5Y' ? active : inactive}
					>
						5 Years
					</button>
				</li>
				<li>
					<button
						onClick={() => dispatch({ type: 'timeChange', value: 'MAX' })}
						type="button"
						className={state.time === 'MAX' ? active : inactive}
					>
						MAX
					</button>
				</li>
			</ul>
		</>
	);
}
